const http = require('http'); // global http
const routes = require('./routes');

// creation of server
const server = http.createServer(routes.handler);

server.listen(3000);   // listen to a port (continuous loop)