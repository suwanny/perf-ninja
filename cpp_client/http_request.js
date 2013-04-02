
var http    = require 'http'
var logger  = require('winston');

var options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/upload',
  method: 'POST'
};

var request_callback = function(res) {
  logger.info('STATUS: ' + res.statusCode);
  logger.info('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    logger.info('BODY: ' + chunk);
  });
}


logger.info("before making requests");

for (var i = 0; i < 10; i++){
  var req = http.request(options, request_callback);
  req.write('hello');
  req.end;
}

logger.info("before making requests");