
var winston = require('winston');

var timestamp = function(){
  var time = new Date();
  var month   = time.getMonth()   < 10 ? '0' + time.getMonth()   : time.getMonth();
  var day     = time.getDate()    < 10 ? '0' + time.getDate()    : time.getDate();
  var hours   = time.getHours()   < 10 ? '0' + time.getHours()   : time.getHours();
  var minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  var seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
  var msecs   = time.getMilliseconds();
  if (msecs < 10) {
    msecs = '00' + msecs;
  }
  else if(msecs < 100) {
    msecs = '0' + msecs; 
  }

  var ts = '[' + 
    time.getFullYear() + 
    '-' + month + 
    '-' + day + 
    ' ' + hours + 
    ':' + minutes + 
    ':' + seconds + 
    '.' + msecs + ']';
  return ts;
}

exports.logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(
      {'timestamp':timestamp}
    )
  ]
});