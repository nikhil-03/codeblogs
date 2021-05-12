const http = require('http');
const app = require('./app');
const morgan = require('morgan');
const port = 3000 || process.env.PORT;
require("dotenv").config();



const server = http.createServer(app); 

server.listen(port);