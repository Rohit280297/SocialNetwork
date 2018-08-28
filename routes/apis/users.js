const express = require('express');
const route = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const {User} = require('../../models/User');
const secret = require('../../config/keys').secret;
const passport = require('passport');


route.get('/test',(req,res)=>res.json({message:"Users is working"}));

route.post('/register',(req,res)=>{

    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            return res.status(400).json({email:'Email already exists.'});
        }else{
           let avatar = gravatar.url(req.body.email,{
                s:'200', // Size
                r:'pg', // Rating
                d:'mm' // Default avatar
            });

            let newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                avatar
            });
             
            bcrypt.genSalt(10,(error,salt)=>{
                bcrypt.hash(req.body.password,salt,(err,hash)=>{
                    newUser.set({password:hash});
                    newUser.save().then(user=>{
                        res.status(200).json({"This is the response":user});
                    }).catch(e=>{
                        res.status(400).send(e);
                    })
                });
            });
        }
    }).catch(e=>{
        res.status(400).send(e);
    });
});

route.post('/login',(req,res)=>{
    let body = _.pick(req.body,['email','password']);
    console.log(body.password);
    User.findOne({email:body.email}).then(user=>{
        // console.log(user);
        bcrypt.compare(body.password,user.password).then((result)=>{
            if(result){
                // res.status(200).json('Successfully Logged In');
                let payload = {id:user._id,name:user.name,avatar:user.avatar,email:user.email}
                jwt.sign(payload,secret,(err,token)=>{
                    res.header('Bearer',token).send('Successful');
                });
            }
            else{
                res.status(400).json('Password Incorrect');
            }
        });
    }).catch(e=>{
        res.status(404).json({email:'Email not found'});
    });
});

route.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({'msg':'Success'});
});

module.exports = route;



// completed till making a login request and sending back the token to the user.
// next step would be to find the user by token.