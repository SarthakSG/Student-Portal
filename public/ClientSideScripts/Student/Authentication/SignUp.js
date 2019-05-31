var password_input = document.getElementById("tInputPassword1");
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

var userCreated = false;

const err = $('#err');
err.hide();
$('#signupForm').on('submit', (e) => {
    var email = document.getElementsByName('email')[0].value;
    var password = document.getElementsByName('tpassword')[0].value;
    var cpassword = document.getElementsByName('password')[0].value;
    var rollNumber = document.getElementsByName('rollNumber')[0].value;
    var firstName = document.getElementsByName('firstName')[0].value;
    var lastName = document.getElementsByName('lastName')[0].value;
    var year = document.getElementsByName('SelectYear')[0].value;
    var branch = document.getElementsByName('SelectBranch')[0].value;

    var validationError;

    var userInfo = {
        Email: email,
        Password: password,
        ProfilePictureUrl: '',
        RollNumber: rollNumber,
        FirstName: firstName,
        LastName: lastName,
        Year: year,
        Branch: branch,
        year_branch: parseInt(year) * 10 + parseInt(branch),
    };

    if (!userCreated) {
        e.preventDefault();
        {
            if (email.indexOf('@iilmcet.ac.in') == -1) {
                validationError = "Email address is invalid";
                err.show();
                err.append(validationError)
            } else if (password != cpassword && password.lenght > 10) {
                validationError = "Password not correctly confirmed";
                err.show();
                err.append(validationError);
            } else {
                $('#loading_overlay').show();


                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                    if (error) {
                        $('#loading_overlay').hide();

                        err.show();

                        if (error.code == "auth/email-already-in-use") {
                            err.append("Email-id is already in use <br>");
                        } else if (error.code == "auth/invalid-email") {
                            err.append("Email-id is invalid <br>");
                        } else if (error.code == "auth/weak-password") {
                            err.append("Password is too weak  <br>");
                        } else console.log(error.code);
                        console.log(error.message);
                    }
                }).then(function (user) {


                    if (user) {
                        userInfo.id = user.uid;
                        document.getElementById('uid').value = user.uid;
                        console.log(document.getElementById('uid').value);

                        user.updateProfile({
                            displayName: userInfo.FirstName + " " + userInfo.LastName
                        }).catch(function (error) {
                            console.log(error);
                        }).then(function (t) {
                            console.log("displayName in User : " + user.displayName);
                        });
                        user.sendEmailVerification().then(function (t) {
                            firebase.auth().signOut().then(function () {
                                alert("Please veify your Email-Id");
                                /* var req = new XMLHttpRequest();
                                req.open('post','/student/signup',false);
                                req.send(userInfo); */
                                userCreated = true;
                                $('#signupForm').submit();
                                return true;
                            }, function (error) {
                                console.error('Auth Error : ', error);
                            });

                        });
                        console.log(user);

                    } else console.log("Auth Error");

                });
            }
        }
    }
})