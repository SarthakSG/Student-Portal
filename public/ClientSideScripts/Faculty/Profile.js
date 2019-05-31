
$('#profile').click(function() {
    GetIdToken((t)=>{
        window.location.href = '/faculty/profile?t='+t;
        return false;
    })
});