var http = require('http');

http.createServer(function (req, res) {
  console.log("get a request.. from " + 
    req.connection.remoteAddress + ":" +
    req.connection.remotePort);
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
  console.log("sent a response");
}).listen(5000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:5000/');