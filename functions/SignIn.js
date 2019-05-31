const email = document.getElementById('InputEmail1');
const pass = document.getElementById('InputPassword1');

const auth = firebase.auth();
const user = auth.currentUser.emailVerified;
const displayName = user.displayName;


const btnSignIn = document.getElementById('btnSignIn');

btnSignIn.addEventListener('click', function (err) {
    auth.signInWithEmailAndPassword(email.value, pass.value).catch(function (error) {
        if (error) cons2ole.log(error.code + "\n" + error.message);
    })
        .then(function (t) {
            auth.onAuthStateChanged(function (firebaseUser) {
                console.log('SignIn AuthLis \n' + firebaseUser);


                if (firebaseUser) {
                    console.log(firebaseUser);

                    location.href = '/student/dashboard';
                }


            });

        });
});

