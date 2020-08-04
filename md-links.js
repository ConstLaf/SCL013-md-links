'use strict'

const fs = require('fs') // Este módulo provee una API para interactuar con el sist. de archivos
const path = require('path') // Este módulo provee de utilidades para trabajar con rutas de archivos y directorios.
const chalk = require('chalk') // Librería para colores
const marked = require('marked') // Compilador para parsear markdown 

const RegExr = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n]+)(?=\))/g

//  Clase que representa a un archivo markdown y sus links
class MarkdownFile {
    constructor(path, links) {
        this.path = path
        this.links = links
    }
}

//  Clase que representa a un link y su texto
class MarkdownLink {
    constructor(text, href) {
        this.text = text
        this.href = href
    }
}


let filePath = process.argv[2] // Process es un objeto global que provee de info y control de un proceso de nodejs
console.log('ARG:', chalk.blue(filePath)) // Nos muestra la ruta relativa 

filePath = path.resolve(filePath) // Resuelve la ruta relativa en absoluta
console.log('RESOLVE:', chalk.yellow(filePath)) 

filePath = path.normalize(filePath) // Se deshace se .. extras
console.log('PATH:', chalk.magenta(filePath)) // Ruta donde se encuentra el archivo.md

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

module.exports = dirOrFile 

/* dirOrFile().then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    }) */

 /* const readingFile = (pathFile, enconding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathFile, encoding, (err, data) => {
            if(err) {
                reject(err)
                console.log('Probando ERROR', err)
            } else {
                resolve(data)
                console.log('DATITOS del FILE', data)
            }
        })
    })
}
 */
/* const returnFileUrls = (url) => {
    fs.readFile(filePath, "utf-8", (err, file) => { // entra al archivo
      const arrayLinks = file.match(RegExr);
      console.log(chalk.yellow('Reading .md file...')); // está leyendo al archivo
      if (err) {
        console.log(err);
      } else {
        arrayLinks.map((url) => {
          console.log(filePath, "\n", chalk.green(url));
        });
      }
    });
  } */
 
  

//  console.log(readingFile(file, enconding));
/* readingFile('README.md', 'utf-8') 
    .then(res => {
        console.log(res);
    })
    .catch(err =>{
        console.log(err);
    }) */


    //  returnFileUrls,
    
