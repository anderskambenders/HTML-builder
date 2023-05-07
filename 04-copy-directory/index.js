const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(path.dirname(__filename), 'files-copy'), {recursive: true}, error => {
    if (error) return console.error(error.message);
    console.log('Directory created')
})
fs.readdir(path.join(path.dirname(__filename), 'files'), (error, files) => {
    if (error) return console.error(error.message);
    files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), error => {
            if (error) return console.error(error.message);
        })
    })
})


