var express = require('express');
var router = express.Router();

router.post('/sendmsg', function(req, res) {
  var resp = {};
  var msg = req.body;

  if (!msg || !msg.to || !msg.text) {
    resp.status = "error";
    resp.message = "invalid data";
    res.json(resp);
  }

  var twClient = require('../twilio/message').sendMsg(msg.to, msg.text, function(error, message) {
    if (error) {
      resp.status = "error";
      resp.message = error;
    } else {
      resp.status = "success";
      resp.message = message.sid;
    }

    res.json(resp);
  });

});

router.post('/triggercall', function(req, res) {
  var resp = {};
  var call = req.body;

  if (!call || !call.to) {
    resp.status = "error";
    resp.message = "invalid data";
    res.json(resp);
  }

  var twClient = require('../twilio/call').triggerCall(call.to, function(error, response) {
    if (error) {
      resp.status = "error";
      resp.response = error;
    } else {
      resp.status = "success";
      resp.response = response.sid;
    }

    res.json(resp);
  })

});

router.post('/call/:id', function(req, res) {
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();

  var options = {
    voice: 'woman',
    language: 'en-gb'
  };

  twiml.say('Hello! And welcome to the Twilio App..', options);

  // The id will help you customize the response per user. This was set in 
  // Trigger call > call.js while trigerring the call 

  if (req.params.id == '1') {
    twiml
      .say('Hello World!!')
      .say('Now you will hear a sound', options)
      .play('http://5935c388.ngrok.com/magic-chime-01.mp3') /** http://www.soundjay.com **/
      .say('Yaaaayyyy!!');
  } else {
    twiml
      .say('Waaaasssupppp!!')
      .say('Now you will hear a sound', options)
      .play('http://5935c388.ngrok.com/magic-chime-02.mp3') /** http://www.soundjay.com **/
      .say('Yaaaayyyy!!', options);
  }

  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });
  res.end(twiml.toString());
});

module.exports = router;
