var express  = require('express');
var router = express.Router();
var https  = require('http');
var admin = require('firebase-admin');

router.post('/',function (req,res) {
    console.log('Post req recieved');
    
  // The topic name can be optionally prefixed with "/topics/".
var topic = 'Faculty';

// See documentation on defining a message payload.
var message = {
    notification: {
      title: '$GOOG up 1.43% on the day',
      body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.'
    },
    token: token
  };

// Send a message to devices subscribed to the provided topic.
console.log('sending notif');

admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
  });
  

module.exports = router;