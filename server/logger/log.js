var db = require('diskdb');
db = db.connect('data', ['msg_log', 'call_log']);

var logger = {};

logger.logMsg = function(msgObj) {
  db.msg_log.save({
    "logged_at": (new Date()),
    msg: msgObj
  });
};

logger.logCall = function(msgObj) {
  db.call_log.save({
    "logged_at": (new Date()),
    msg: msgObj
  });
};

module.exports = logger;
