const fs = require('fs');
const path = require('path')

const readableStream = fs.createReadStream(path.join(path.dirname(__filename), 'text.txt'), 'utf8');
let data = '';
readableStream.on('data', (chunk) => {
  data += chunk;
})
readableStream.on('end', () => console.log(data))
readableStream.on('error', error => console.log(Error ,error.message))
