'use strict'

const fs = require('fs') // Este módulo provee una API para interactuar con el sist. de archivos
const path = require('path') // Este módulo provee de utilidades para trabajar con rutas de archivos y directorios.
const chalk = require('chalk') // Librería para colores


let filePath = process.argv[2] // Process es un objeto global que provee de info y control de un proceso de nodejs
console.log('ARG:', chalk.blue(filePath)) // Nos muestra la ruta relativa 

filePath = path.resolve(filePath) // Resuelve la ruta relativa en absoluta
console.log('RESOLVE:', chalk.yellow(filePath)) 

filePath = path.normalize(filePath) // Se deshace se .. extras
console.log('PATH:', chalk.magenta(filePath)) // Ruta donde se encuentra el archivo.md

const dirOrFile = () => { // Función que distinge directorios
    fs.readdir(filePath, (err, files) => { // Función toma dos parámetros, el path y un callback
        files.forEach(file => { // Toma todos los archivos que encuentra y por cada uno :
            if(file.includes('.md')){ // Si cada archivo incluye una extensión .md 
                console.log('EXT.MD->', chalk.green(file)) // 
            }
        })
    })
}

module.exports = dirOrFile