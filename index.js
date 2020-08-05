#!/usr/bin/env node
const path = require('path') // Este módulo provee de utilidades para trabajar con rutas de archivos y directorios.
const { mdlinks } = require('./md-links')
const chalk = require('chalk') // Librería para colores
const asciiCats = require('ascii-cats')


console.log(chalk.blue.bgWhite.bold('-------------------- BIENVENID@S A MD-LINKS --------------------'))
console.log(chalk.bold.blue(asciiCats('nyancat-2')))
console.log(chalk.blue.bgWhite.bold('----------------------------------------------------------------'))

class MarkdownCli {
    constructor(args) { // recibe como parámetro la propiedad args
        this.args = args // hace referencia a los argumentos de esta clase
    }                      // la clase se encarga de buscar los path y validate

    get path() { // método get que obtiene y retorna rutas relativas, las "limpia" y las pasa a absolutas
        return path.normalize(path.resolve(this.args.path)) // Se resuelve de adentro hacia afuera
    }

    get validate() { // método que obtiene el atributo validate
        return this.args.validate // con el argumento
    }
}
// Extraído de aquí: http://yargs.js.org/ y https://markoskon.com/yargs-examples/
const { argv } = require('yargs')
    .usage("Usage: $0 --validate")
    .example(
        "$0 -validate",
        "Returns the markdown files with theirs links status validated"
    )
    .command('$0 [path]', 'Filters the markdown files inside path', (yargs) => {
        yargs.positional('path', {
            describe: 'Path directory for markdown files',
            default: "./"  // En ausencia de path usa por defecto el directorio actual
        })
    })
    .option('validate', { // --validate
        alias: 'v',         // -v  
        type: 'boolean',
        default: false,
        description: 'Validate links status'
    })
    .help()

const cli = new MarkdownCli(argv) // Se crea una nueva instancia de objeto que ofrece una forma más
                                // sencilla de acceder a los argumentos de interés

mdlinks(cli) // Invoca a la función con el parámetro cli que retorna una promesa con sus files y links
    .then(markdownFiles => {
        console.log(chalk.blue.bold('WE HAVE FOUND THE FOLLOWING MARKDOWN FILES: '));
        markdownFiles.forEach(file => {
            console.log(('**********************'))
            console.log(chalk.blue.inverse.bold("MD-FILE: ") + chalk.bold(file.path))
            console.log(('**********************'))
            file.links.forEach(link => {
                console.log("\t\tText: " + link.truncatedText + ", \n\t\tURL: " + link.href + ", \n\t\tStatus: " + link.status)
            })
        })
    }) 
// considerar todas las opciones para el usuario 
// después la opción entregársela 
  
