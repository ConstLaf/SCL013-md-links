const mdlinks = require('./md-links')
const { dirOrFile } = require('./md-links')
const { argv } = require('yargs')
const chalk = require('chalk')

console.log(chalk.blue.bgWhite.bold('----------------- BIENVENID@S A MD-LINKS ---------------------------')) 

if(argv.validate || argv.v) {
    dirOrFile()
    .then(markdownFiles => {
        markdownFiles.forEach(file => {
            console.log(chalk.('FILE: ') + (file.path))
            file.links.forEach(link => {
                console.log(('\t\tText: ' + link.truncatedText + ', \n\t\tURL: ' + link.href + ', \n\t\tStatus: ' + link.status))
            })
        })
    })
}
  
// considerar todas las opciones para el usuario 
// después la opción entregársela 