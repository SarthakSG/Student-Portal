const auth = firebase.auth();
var authCheck = (callback) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            callback(user)
        }

    });
}

authCheck((user)=>{
    document.getElementById('displayName').innerHTML = user.displayName;
    document.getElementById('email').innerHTML= user.email;
    document.getElementById('uid').innerHTML = user.uid;
})