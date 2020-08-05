const mdlinks = require('./md-links')
const { dirOrFile } = require('./md-links')

dirOrFile()
    .then(markdownFiles => {
        markdownFiles.forEach(file => {
            console.log('FILE: ' + file.path)
            file.links.forEach(link => {
                console.log('\tText: ' + link.truncatedText + ', \n\t\tURL: ' + link.href + ', \n\t\tStatus: ')
            })
        })
    })

