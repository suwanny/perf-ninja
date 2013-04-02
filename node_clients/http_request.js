
var http    = require('http');
var helper  = require('./helper')
var logger  = helper.logger;

var options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/upload',
  method: 'POST'
};

var request_callback = function(res) {
  logger.info('STATUS: ' + res.statusCode + ': ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    // logger.debug('BODY: ' + chunk);
  });
}

logger.info("before making requests");

for (var i = 0; i < 100; i++){
  var req = http.request(options, request_callback);
  req.on('error', function(e) {
    logger.error('problem with request: ' + e.message);
  });
  req.write('hello');
  req.end();
}

logger.info("after making requests");