const router = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.json({success:false, message:"hashing issue"})
        }
        else{
    
            const user = new User({
                fullname: req.body.fullname,
                email: req.body.email,
                password: hash,
            })
        
            user.save()
            .then((_) => {
                res.json({success: true, message: "Account has been created"})
            })
            .catch((err) => {
                if(err.code === 11000){
                    return res.json({success:false, message:"email id already exist"})
                }
                res.json({success:false, message:"Auth Failed"})
            })
        }
    })
})

router.post('/login', (req, res) => {
    res.json()
})

module.exports = router