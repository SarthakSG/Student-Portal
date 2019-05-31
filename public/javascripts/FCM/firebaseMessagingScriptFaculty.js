  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBlzndLTLHThD68KN1C9C6UNueGj0JvaPU",
    authDomain: "student-portal-2017.firebaseapp.com",
    databaseURL: "https://student-portal-2017.firebaseio.com",
    projectId: "student-portal-2017",
    storageBucket: "student-portal-2017.appspot.com",
    messagingSenderId: "124113730727"
  };
  firebase.initializeApp(config);

  const messaging = firebase.messaging();

  
  function sendToken(token) {
    authCheck((user) => {
      var fcmToken = firebase.database().ref('IILM-CET/Users/' + user.uid+'/FCMToken');
      fcmToken.once('value',(snapshot)=>{
        if(!snapshot.exists()){
          fcmToken.set(token);
          console.log('FCM Token Updated');
          
        }
      })
    })
    
  }

  messaging.requestPermission()
  .then(()=>{
      console.log('Permission Granted');
      return messaging.getToken();

      
  })
  .then((token)=>{
    console.log('fcm token : '+token);
    
    sendToken(token);

  })
  .catch((err)=>{
      console.log('Error : '+err);
    
  });

  messaging.onTokenRefresh(()=>{
    messaging.getToken()
    .then((token)=>{
       console.log('Token Refreshed');
       sendTokenToServer(token);

    })
  });

  messaging.onMessage((payload)=>{
    console.log('Message : ',payload)
  })

