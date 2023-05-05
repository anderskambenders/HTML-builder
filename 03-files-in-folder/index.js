const { error } = require('console');
const fs = require('fs');
const path = require('path');

fs.readdir(path.join(path.dirname(__filename), 'secret-folder'), {withFileTypes: true}, (error, files) => {
    if (error) return console.error(error.message);
    files.forEach(dirent => {
        if (dirent.isFile()) {
            let filePath = path.join(path.dirname(__filename), 'secret-folder', dirent.name);
            let fileName = dirent.name.split('.')[0];
            let ext = dirent.name.split('.')[1];

            fs.stat(filePath, (error,stat) => {
                if (error) return console.error(error.message);
                console.log(`${fileName} - ${ext} - ${Math.ceil(stat.size/1024)}kb`)
            })

        }
    })
})

