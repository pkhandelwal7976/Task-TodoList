const http 				= require('http');
const app 				= require('./app'); // app file include
const globalVariable	= require('./nodemon.js');
const port = globalVariable.port;
// console.log(port)

console.log('************************************');
console.log('Api running on port :', port);
console.log('************************************');

const server = http.createServer(app);


server.listen(port);