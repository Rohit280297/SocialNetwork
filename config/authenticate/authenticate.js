const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const {User} = require('../../models/User');
const secret = require('../keys').secret;

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = passport =>{
    passport.use(new JwtStrategy(opts,(payload,done)=>{
        User.findById({_id:payload.id}).then(user=>{
            if(!user){
                return done(null,false);
            }
            return done(null,user);
        }).catch(e=>{
            return done(e);
        });
    }));
};
