var user = firebase.auth().currentUser;
var btn = document.getElementById('menu');
var icon = $('#menu_icon');
var open = false;


authCheck((user) => {

    document.getElementById('displayName').innerHTML = user.displayName;
    GetIdToken((t) => {
        $('#t').val(t);
        console.log('token Sent ... ' + t);

    })
});



btn.addEventListener('click', () => {
    $('#menu').addClass('rotate');
    setTimeout(() => {
        $('#menu').removeClass('rotate');

    }, 2000)


});

window.addEventListener("beforeinstallprompt", ev => {
    // Stop Chrome from asking _now_
    ev.preventDefault();

    // Create your custom "add to home screen" button here if needed.
    // Keep in mind that this event may be called multiple times,
    // so avoid creating multiple buttons!
    btn.onclick = () => ev.prompt();
});

