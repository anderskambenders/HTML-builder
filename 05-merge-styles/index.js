const path = require('path');
const fs = require('fs');
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (_, files) => {
    const filesVerified = files.filter((file) => file.isFile());
    const filesCss = filesVerified.filter((file) => file.name.split('.')[1] === 'css');

    fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (error) => {
        if (error) return console.error(error.message);
    });

    const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

    filesCss.forEach((file) => {
    const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
    readStream.on('data', (chunk) => writeStream.write(chunk));
    readStream.on('error', (error) => console.log('Error', error.message));
    });
});