
var authCheck = (callback) => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      callback(user)
    }

  });
}
const messaging = firebase.messaging();

function sendToken(token) {
  authCheck((user) => {
    var fcmToken = firebase.database().ref('IILM-CET/Users/' + user.uid + '/FCMToken');
    fcmToken.once('value', (snapshot) => {
      if (!snapshot.exists()) {
        fcmToken.set(token);
        console.log('FCM Token Updated');

      }
    })
  })
}

messaging.requestPermission()
  .then(() => {
    console.log('Permission Granted');
    return messaging.getToken();
  })
  .then((token) => {
    console.log('fcm token ' + token);
    sendToken(token);

  })
  .catch((err) => {
    console.log('Error : ' + err);

  })

