
$('#logout').click(function() {
    console.log('logging out');
    
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.auth().signOut().then(function() {
                console.log('Signed Out');
              }, function(error) {
                console.error('Sign Out Error : ', error);
              });
        }  
        });
    
    return false;
});