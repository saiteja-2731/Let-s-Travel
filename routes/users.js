let User = require('../models/users').User ; 
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

router.post('/login', async (req,resp)=>{
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email:email});
    if(user.length>0){
        let comparisonResult = await bcrypt.compare(password,user[0].password);//for comparing the encrypted password and entered password
        if(comparisonResult){
            let token = auth.generateToken(user[0]);
            resp.cookie('auth_token',token); // for storing tokens in cookies
            resp.send({
                redirectURL : '/admin'
            });
        }
        else{
            resp.status(400);
            resp.send('Rejected');
        }
    }else{
        resp.status(400);
        resp.send('Rejected');
    }
})

router.post('/register', async (req,resp)=>{
    let email = req.body.email;
    let password = req.body.password;
    let rePassword = req.body.rePassword
    let user = await User.find().where({email:email});
    if(user.length===0) {
        let encryptedPass = await bcrypt.hash(password,12);//encrypting the password for security purposes
        let newUser = new User({
            email:email,
            password: encryptedPass
        })
        await newUser.save();
        resp.send('Done');
    }
    else{
        resp.send('Rejected');
    }
})

module.exports = router;