const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (error) => {
    if (error) return console.error(error.message);
});

const tempReadStream = fs.createReadStream(path.join(__dirname, 'template.html'));
let template = '';
tempReadStream.on('data', (chunk) => {
    template += chunk;
});
tempReadStream.on('error', (error) => console.log(error.message));

let tags = [];
tempReadStream.on('end', () => {
    tags = template.toString().match(/{{\w*}}/g).map((elem) => elem.replace(/{{/, '').replace(/}}/, ''));
    fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (error, files) => {
        if (error) return console.error(error.message)
        files.forEach((file) => {
            const readStream = fs.createReadStream(path.join(__dirname, 'components', file.name));
            const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
            readStream.on('data', (chunk) => {
                const obj = {};
                obj[file.name] = chunk;
                const tag = file.name.split('.')[0];
                template = template.replace(new RegExp(`{{${tag}}}`), obj[file.name]);
                writeStream.write(template);
        });
        readStream.on('error', (error) => console.log(error.message));
    });
    });
});

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
    if (error) return console.error(error.message);
    const filesVerified = files.filter((file) => file.isFile());
    const filesCss = filesVerified.filter((file) => file.name.split('.')[1] === 'css').reverse();
    fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (error) => {
        if (error) return console.error(error.message);
    });
    const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
    filesCss.forEach((file) => {
    const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
    readStream.on('data', (chunk) => writeStream.write(chunk));
    readStream.on('error', (error) => console.log('Error', error.message));
    });
});

const copyDirectory = (src, dest) => {
    fs.mkdir(dest, { recursive: true }, (error) => {
        if (error) return console.error(error.message);
    });
    fs.readdir(src, { withFileTypes: true }, (error, files) => {
        if (error) return console.error(error.message);
        files.forEach((file) => {
            let srcNext = path.join(src, file.name);
            let destNext = path.join(dest, file.name);
            fs.stat(srcNext, (error, stats) => {
                if (error) return console.error(error.message);
                if (stats.isDirectory()) {
                    copyDirectory(srcNext, destNext);
                }
                if (stats.isFile()) {
                    fs.copyFile(srcNext, destNext, (error) => {
                        if (error) return console.error(error.message);
                    });
                }
            });
        });
    });
};
const source = path.join(__dirname, 'assets');
const destination = path.join(__dirname, 'project-dist', 'assets');
copyDirectory(source, destination);