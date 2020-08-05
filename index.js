const path = require('path') // Este módulo provee de utilidades para trabajar con rutas de archivos y directorios.
const mdlinks = require('./md-links')
const { dirOrFile } = require('./md-links')
// const asciiCats = require('ascii-cats')


// console.log(asciiCats('nyancat-2'))

class MarkdownCli {
    constructor(args) { // recibe como parámetro la propiedad args
        this.args = args // hace referencia a los argumentos de esta clase
    }                      // la clase se encarga de buscar los path y validate

    get path() { // método get que obtiene y retorna rutas relativas, las "limpia" y las pasa a absolutas
        return path.normalize(path.resolve(this.args.path)) // Se resuelve de adentro hacia afuera
    }

    get validate() { // método que obtiene el atributo validate
        return this.args.validate 
    }
}
// Extraído de aquí: http://yargs.js.org/
const { argv } = require('yargs')
    .usage("Usage: $0 --validate")
    .example(
        "$0 -validate",
        "Returns the markdown files with theirs links status validated"
    )
    .command('$0 [path]', 'Filters the markdown files inside path', (yargs) => {
        yargs.positional('path', {
            describe: 'Path directory for markdown files',
            default: "./"
        })
    })
    .option('validate', {
        alias: 'v',
        type: 'boolean',
        default: false,
        description: 'Validate links status'
    })
    .help()

console.log(argv);

const cli = new MarkdownCli(argv)

dirOrFile(cli)
    .then(markdownFiles => {
        markdownFiles.forEach(file => {
            console.log("MD-FILE: " + file.path)
            file.links.forEach(link => {
                console.log("\tText: " + link.truncatedText + ", \n\t\tURL: " + link.href + ", \n\t\tStatus: " + link.status)
            })
        })
    }) 
// considerar todas las opciones para el usuario 
// después la opción entregársela 