var client = require('./client');
var logger = require('../logger/log');
var msg = {};

msg.sendMsg = function(to, message, callback) {
  client.sendMessage({
    to: to,
    from: '+16165225251', // your Twilio number
    body: message // The body of the text message
  }, function(error, message) {
    // Log the response to DiskDB to auditing purposes
    if (error) {
      logger.logMsg({
        "status": "error",
        "error": error
      });
    } else {
      logger.logMsg({
        "status": "success",
        "message": message
      });
    }
    callback(error, message);
  });
};

module.exports = msg;
