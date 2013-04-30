var http = require('http');

var counter = 0;
http.createServer(function (req, res) {
  counter += 1;
  console.log("[" + counter + "] get a request.. from " + 
    req.connection.remoteAddress + ":" + req.connection.remotePort);

  res.writeHead(200, {'Content-Type': 'text/plain', 'Server':'NodeJS'});
  res.end("hello, world!");
  // console.log("sent a response");
}).listen(5000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:5000/');