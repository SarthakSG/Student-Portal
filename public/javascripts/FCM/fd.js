const messaging = firebase.messaging();
var fcmtoken ;
messaging.requestPermission().then(()=>{
    console.log('Permission Granted');
    messaging.getToken().then((token)=>{
        fcmtoken = token;
        console.log('Token : '+token);
    })

}).catch((error => {
    console.log(error);
}));

