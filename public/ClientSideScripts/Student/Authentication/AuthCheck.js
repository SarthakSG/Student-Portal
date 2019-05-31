firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        $('#loading_overlay').show();
        window.location.href = '/student/signin';
        return false;
    } else {
        

    }

});


 var authCheck = (callback)=>{
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            callback(user)
        }
    
    });
 }
 
var GetIdToken = (callback) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken(true).then((token) => {

                callback(token);


            });

        }

    });

}