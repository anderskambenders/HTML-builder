const fs = require('fs');
const path = require('path');

const {stdin, stdout, exit} = process;
stdout.write('Hello there! Write something...\n');

const writeStream = fs.createWriteStream(path.join(path.dirname(__filename), 'text.txt'), 'utf-8');

stdin.on('data', (data) => {
    let str = data.toString().trim();
    if (str === 'exit') {
        stdout.write('General Kenobi...');
        exit();
    }
    writeStream.write(data);
    process.on('SIGINT', () => {
        stdout.write('General Kenobi...');
        exit();
    })
})
