'use strict'

const fs = require('fs') // Este módulo provee una API para interactuar con el sist. de archivos
const path = require('path') // Este módulo provee de utilidades para trabajar con rutas de archivos y directorios.
const chalk = require('chalk') // Librería para colores
const marked = require('marked') // Compilador para parsear markdown 
const fetch = require('node-fetch')

//  Clase que representa a un archivo markdown y sus links
class MarkdownFile {
    constructor(path, links) {
        this.path = path
        this.links = links
    }
}

//  Clase que representa a un link y su texto
class MarkdownLink {
    status = 'NOT VERIFIED'

    constructor(text, href) {
        this.text = text
        this.href = href
    }

    set status(newStatus) {
        this.status = newStatus
    }

    get truncatedText() {
        if (this.text.length > 50) {
            return this.text.substring(0, 50) // Método devuelve un subconjunto de un objeto String.
        } else {
            return this.text
        }
    }
}




let filePath = process.argv[2] // Process es un objeto global que provee de info y control de un proceso de nodejs
console.log('ARG:', chalk.blue(filePath)) // Nos muestra la ruta relativa 

filePath = path.resolve(filePath) // Resuelve la ruta relativa en absoluta
console.log('RESOLVE:', chalk.yellow(filePath)) 

filePath = path.normalize(filePath) // Se deshace se .. extras
console.log('PATH:', chalk.magenta(filePath)) // Ruta donde se encuentra el archivo.md

const validate = true

const dirOrFile = () => { // Función que distinge directorios
    return new Promise((resolve, reject) => {
        fs.readdir(filePath, (error, files) => { // Función toma dos parámetros, el path y un callback
            if(error){
                reject(error)
                console.log(chalk.red.bold('INVALID PATH ->'), error)
            } else {
                const markdownsFiles = files.filter(file => file.endsWith('.md'))

                directoryContent(markdownsFiles)
                    .then(markdownFilesWithLinks => {
                        console.log(markdownFilesWithLinks)
                        resolve(markdownFilesWithLinks)
                    })
                    .catch(error =>{
                        reject(error)
                    })
            }  
        })
    })
}

const readMarkdownFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (error, fileContent) => {
            if(error) {
                console.log(error);
            } else {
                const links = []
                const renderer = new marked.Renderer()

                renderer.link = (href, title, text) => {
                    links.push(new MarkdownLink(text, href))
                }
                marked(fileContent, {
                    renderer: renderer
                })
                resolve(new MarkdownFile(file, links))
            }
        })
    })
}

const directoryContent = (markdownsFiles) => {
    return new Promise((resolve, reject) => {
        Promise.all(
            markdownsFiles.map(file => {
                return readMarkdownFile(file)
            })
        )
        .then(filesWithLinks => {
            resolve(filesWithLinks)
        })
    })
}



module.exports = { 
    dirOrFile }

