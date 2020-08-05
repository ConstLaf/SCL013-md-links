const mdlinks = require('./md-links')
const { dirOrFile } = require('./md-links')

dirOrFile()
    .then(markdownFiles => {
        markdownFiles.forEach(file => {
            console.log('FILE: ' + file.path)
            file.links.forEach(link => {
                console.log('\t\tText: ' + link.truncatedText + ', \n\t\tURL: ' + link.href + ', \n\t\tStatus: ' + link.status)
            })
        })
    })

// considerar todas las opciones para el usuario 
// después la opción entregársela 