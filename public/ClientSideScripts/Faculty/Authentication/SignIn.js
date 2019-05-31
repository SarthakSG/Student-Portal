var loading = $('#loading_overlay');
var err = $('#err');
err.hide();
var auth = firebase.auth();
var user;

var email_input = document.getElementById("email");
var password_input = document.getElementById("password");
var show_password = document.getElementById("show_password");
var password_shown = false;
show_password.addEventListener('click', () => {
    if (!password_shown) {
        password_input.setAttribute('type', 'text');
        password_shown = true;
        show_password.style.color = "#989898";
    }
    else {
        password_input.setAttribute('type', 'password');
        password_shown = false;
        show_password.style.color = "#000000";


    }
});


$('#sign_in').click(() => {
    err.html("");
    console.log('In Sign in');
    loading.show();
    var email = email_input.value;
    var password = password_input.value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        if (error) {/*  */
            loading.hide();
            err.show();
            if (error.code == "auth/invalid-email") {
                err.append('Email-id is invalid </br>');
            } else if (error.code == "auth/wrong-password") {
                err.append('Password is incorrect </br>');

            } else if (error.code == "auth/user-not-found") {
                err.append('No user found with given credentials </br>');
            } else if (error.code == "auth/user-disabled") {
                err.append('Your account is disabled! </br>');
            }
            console.log(error.code);
            console.log(error.message);
        }
    }).then(function (user) {
        /*  user = auth.currentUser;
         var dash = new XMLHttpRequest();
 
 
 
         if (!user.emailVerified) {
             error.removeClass('hide');
             errorelem.innerHTML = ('Please verify your email id </br>');
         } else {
             user.getIdToken(true).then((token) => {
 
                 
                 dash.open("post", '/faculty/dashboard', false);
                 var data = {
                     t : token
                 }
                 dash.send(JSON.stringify(data));
 
 
             });
 
         } */
         
        if (user != null) {
            var user = firebase.auth().currentUser;
            var userId = firebase.auth().currentUser.uid
            console.log('IILM-CET/Users/'+ userId + '/AccountType');
            var userInfoRef = firebase.database().ref('IILM-CET/Users/'+ userId + '/AccountType');
            userInfoRef.once('value', (snapshot) => {
                if (snapshot != null) {

                    if (snapshot.val() == 'Faculty' || snapshot.val() == 'Admin') {
                        if (user.emailVerified) window.location.href = '/faculty/dashboard';
                        else {
                            loading.hide();
                            err.show();
                            err.append('Please verify your Email id</br>');
                        }


                    } else {
                        loading.hide();
                        console.log("User doesn't have enough permissions");
                        alert("User doesn't have enough permissions");
                        firebase.auth().onAuthStateChanged(function (user) {
                            if (user) {
                                firebase.auth().signOut().then(function () {
                                    console.log('Signed Out');

                                }, function (error) {
                                    console.error('Sign Out Error : ', error);
                                });
                            }
                        });
                        loading.hide();
                    }
                }
            });
        }




    });
    return false;
})

$('#forgot_password').click(() => {
    err.html("");
    var auth = firebase.auth();
    var email = $('#email').val();

    if (email.includes('@iilmcet.ac.in')) {
        auth.sendPasswordResetEmail(email).then(() => {
            error.removeClass('hide');
            err.append('Password reset email sent </br>');
        }).catch((error) => {
            error.removeClass('hide');
            err.show();
            err.append(error.message.toString() + '</br>');
            console.log(err);

        });
    } else {
        err.show();
        error.removeClass('hide');
        err.append('Please enter a valid email address </br>');

    }
})
