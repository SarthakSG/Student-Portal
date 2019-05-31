var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');


router.get('/',(req,res,next)=>{
    
        res.render('Student/Profile.ejs');
    
})

module.exports = router;
