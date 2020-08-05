#!/usr/bin/env node
'use strict'

const fs = require('fs') // Este módulo provee una API para interactuar con el sist. de archivos
const chalk = require('chalk') // Librería para colores
const marked = require('marked') // Compilador para parsear markdown 
const fetch = require('node-fetch') // Librería para consultas http

//  Clase que representa a un archivo markdown y sus links
class MarkdownFile { // Es un tipo especial de función
    constructor(path, links) { // en el método constructor se asignan las propiedades
        this.path = path // Hace referencia a la ruta de esta clase 
        this.links = links // Hace referencua a los links de esta clase
    }
}

//  Clase que representa a un link y su texto
class MarkdownLink {
    status = chalk.bold.yellowBright.inverse('Not verified')

    constructor(text, href) {
        this.text = text // Hace referencia al texto de esta clase 
        this.href = href // Hace referencia al href de esta clase 
    }

    set status(newStatus) { // Un setter es un método que establece el valor de una propiedad específica
        this.status = newStatus // Hace referencia al newStatus de esta clase
    }

    get truncatedText() { // Un getter es un método que obtiene el valor de una propiedad específica.
        if (this.text.length > 50) {
            return this.text.substring(0, 50) // Método devuelve un subconjunto de un objeto String.
        } else {                               // Parámetro (int entre 0 y longitud de la cadena)
            return this.text
        }
    }
}


const mdlinks = (cli) => { // Función que distinge directorios
    return new Promise((resolve, reject) => {
        fs.readdir(cli.path, (error, files) => { // Función toma dos parámetros, el path entregado en el cli y un callback
            if(error){
                reject(error)
                console.log(chalk.bgRed.bold('INVALID PATH ->'), chalk.red(error))
            } else {
                const markdownsFiles = files.filter(file => file.endsWith('.md')) // Filtra archivos que terminan con .md

                directoryContent(markdownsFiles) // Función que recibe a los archivos .md
                    .then(markdownFilesWithLinks => { 
                        if (!cli.validate) { // Si el valor de validate es falso
                            resolve(markdownFilesWithLinks) // Entrega los links sin validar
                            return
                        }

                        // Si tenemos que validar, usaremos una promesa que actualice el estado de los links
                        updateMarkdownFilesLinksStatus(markdownFilesWithLinks)
                            .then(() => {
                                resolve(markdownFilesWithLinks)
                            })
                            // .catch(...) El catch no es necesario porque las promesas dentro de esta promesa no fallarán
                            // Cuando encuentran un error, solo cambiarán el estado de los links
                    })
                    .catch(error =>{
                        reject(error)
                    })
            }  
        })
    })
}

const readMarkdownFile = (file) => { // Promesa que lee archivos .md
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (error, fileContent) => {
            if(error) {
                console.log(error);
            } else {
                const links = []
                const renderer = new marked.Renderer() // Extrae las diferentes partes del markdown

                renderer.link = (href, title, text) => {
                    // Hay urls que hacen referencia a elementos dentro de un html a través del símbolo #
                    // Hay que evitar agregarlos a la lista porque los fetch siempre fallarán y no son URLs válidas
                    if (!href.startsWith('#')) {
                        links.push(new MarkdownLink(text, href))
                    }
                }
                marked(fileContent, { // La función marked indica que comience a renderizar
                    renderer: renderer
                })

                resolve(new MarkdownFile(file, links))
            }
        })
    })
}

const directoryContent = (markdownsFiles) => { // Promesa que lee el contenido de un directorio
    return new Promise((resolve, reject) => {
        Promise.all(
            markdownsFiles.map(file => { // Mapea crea un array de promesas 
                return readMarkdownFile(file) // Se crea una promesa para cada archivo
            })
        )
        .then(filesWithLinks => { // Se ejecuta cuando todas las promesas se han finalizado
            resolve(filesWithLinks)
        })
    })
}

const updateMarkdownFilesLinksStatus = (markdownFiles) => {
    return new Promise((resolve, reject) => {
        if (markdownFiles.length == 0) {
            // Si no hay archivos regresamos de inmeditato
            resolve()
            return
        }

        Promise.all(
            markdownFiles.map( markdownFile => {
                // Agrupa las promesas para todos los archivos
                return updateMarkdownFileLinksStatus(markdownFile)
            })
        )
        .then(() => {
            // Se avisa a la promesa anterior que todos los fetch ya finalizaron
            resolve()   
        })
    })
}

// Se retorna una promesa que avisará cuando todos los links del archivos han sido consultados con fetch
const updateMarkdownFileLinksStatus = (markdownFile) => {
    return new Promise((resolve, reject) => {
        if (markdownFile.links.length == 0) {
            resolve()
            return
        }

        Promise.all(
            markdownFile.links.map( link => {
                return new Promise((resolve, reject) => {
                    fetch(link.href)
                        .then(response => {
                            if (response.status === 200) {
                                link.status = chalk.inverse.greenBright("OK ✔: 200")
                            } else if (response.status === 301) {
                                link.status = chalk.inverse.greenBright("OK ✔: 301" + response.status)
                                console.log(response.status)
                            } else if (response.status === 404) {
                                link.status = chalk.inverse.redBright("FAIL ⛔: 404")
                            } else {
                                link.status = chalk.inverse.redBright("FAIL ⛔: " + response.status)
                            }

                            resolve()
                        })
                        .catch(error => {

                            // Atrapamos la falla y cambiamos el estado del link fallido
                            link.status = chalk.inverse.redBright("FAIL ⛔: " + error)

                            // No es necesario hacer fallar al fetch con 'reject'
                            // Solo marcaremos que el link no pudo ser validado
                            // De esta forma esta promesa jamás fallará
                            resolve()
                        })
                })
            })
        )
        .then(() => {
            // Solo nos interesa saber que todos los fetch finalizaron
            // Le avisaremos a la promesa anterior que hemos finalizado, para que pueda reaccionar
            resolve()
        })
        // .catch(...) No es necesario el catch, porque jamas ocurrirá
        // Nunca ocurrirán errores, porque el catch de las promesas internas "fallarán" con exito
        // Esto quiere decir que si el fetch falla, solo se cambiará el estado de link a false
    })
}


module.exports = { 
    mdlinks }
