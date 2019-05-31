var loading = $('#loading_overlay');
var err = $('#err');
err.hide();

firebase.auth().onAuthStateChanged(function (user) {
    if (user != null) {
        var userId = user.uid;
        console.log(userId);
        if (user.emailVerified) { window.location.href = '/student/dashboard'; }
        else {


        }
    }
});




var password_input = document.getElementById("password");
var show_password = document.getElementById("show_password");
var password_shown = false;
show_password.addEventListener('click', () => {
    if (!password_shown) {
        password_input.setAttribute('type', 'text');
        password_shown = true;
        show_password.style.color = "#989898"
    }
    else {
        password_input.setAttribute('type', 'password');
        password_shown = false;
        show_password.style.color = "#000000"


    }
});

var email_input = document.getElementById("email");
var password_input = document.getElementById("password");
var show_password = document.getElementById("show_password");
var password_shown = false;

$('#sign_in').click(() => {
    console.log('In Sign in');
    err.html("");
    loading.show();
    var email = email_input.value;
    var password = password_input.value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        if (error) {/*  */
            err.show();
            loading.hide();
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

        if (user != null) {
            var userId = user.uid;
            console.log(userId);
            if (user.emailVerified) { window.location.href = '/student/dashboard'; }
            else {
                err.show();
                err.append('Please verify your Email-id </br>');
                loading.hide();
            }
        }




    });
    return false;
})

$('#forgot_password').click(() => {
    err.html("");
       
    var auth = firebase.auth();
    var email = $('#email').val();
    var errorelem = document.getElementById('error');
    var error = $('#error');
    console.log(email);
    if (/* email.includes('@iilmcet.ac.in') */ true) {
        auth.sendPasswordResetEmail(email).then(() => {
            err.show(); 
            err.append('Password reset email sent </br>');
            console.log('Sent');

        }).catch((error) => {
            err.show(); 
            err.append(error.message + '</br>');
            console.log(err);

        });
    } else {
        err.show(); 
        err.append('Please enter a valid email address </br>');

    }
});

