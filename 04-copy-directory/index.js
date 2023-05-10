const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true}, (err) => {
    if (err) throw err;
    fs.mkdir(path.join(path.dirname(__filename), 'files-copy'), {recursive: true}, error => {
        if (error) return console.error(error.message);
        fs.readdir(path.join(path.dirname(__filename), 'files'), (error, files) => {
            if (error) return console.error(error.message);
            files.forEach(file => {
                fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), error => {
                    if (error) return console.error(error.message);
                })
            })
        })
    })
})
