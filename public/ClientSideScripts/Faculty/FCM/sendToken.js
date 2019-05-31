var express  = require('express');
var router = express.Router();
var https  = require('http');
var admin = require('firebase-admin');

router.post('/',function (req,res) {
  console.log('Recieved Request : '+req.body)
    var token = req.body;

    admin.messaging().subscribeToTopic(token,'Faculty').catch((err)=>{
      console.log('Error : ',err);
      res.status(500);

    })
    .then((response)=>{
      console.log('Subscribed : '+ response);
      res.status(200);
      res.send('Success')

    });


   /*  console.log('Token : '+token);
    var url = 'https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/Faculty';

    var sendToken = new XMLHttpRequest();
    sendToken.open('post',url,true);
    sendToken.setRequestHeader('Content-Type','application/json');
    sendToken.setRequestHeader('Authorization','key=AAAAHOXBPKc:APA91bFp7Mh8vV9CQHC6Ym4wXGcR8mtTq5nMDn2i2PSry2ofgjnzIopGIHDykbbaCD0w3Q2yMHm50vpb17MXCt2S2aTCJxaNmLETdLuaC58Wa9ejvVGktyh5vVLkcWnNDJwbQJBBdu73');
    console.log('Post Req : '+sendToken);
    sendToken.send();
    console.log('Status : '+sendToken.statusText);

    var options = {
      host: 'localhost', port: 5000,
      method : 'POST',
      path : url ,
      headers : {        
        'Content-Type':'application/json',
        'Authorization':'key=AAAAHOXBPKc:APA91bFp7Mh8vV9CQHC6Ym4wXGcR8mtTq5nMDn2i2PSry2ofgjnzIopGIHDykbbaCD0w3Q2yMHm50vpb17MXCt2S2aTCJxaNmLETdLuaC58Wa9ejvVGktyh5vVLkcWnNDJwbQJBBdu73'

      }
    }
    https.request(options,(response)=>{
      console.log('Response : '+response.statusMessage);
    })
     */
  });
  

module.exports = router;