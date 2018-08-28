const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const {User} = require('../../models/User');
const {Profile} = require('../../models/Profile');
const route = express.Router();

route.get('/test',(req,res)=>res.json({message:"Profile is working"}));

// Private route to visit a user's profile

route.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{

    console.log('sdjfs');
    Profile.findOne({user:req.user.id}).then(profile=>{
        let errors={};
        console.log('errors ke neeche');
        if(!profile){
            errors.noprofile='There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.status(200).send(profile);

    }).catch(e=>{
        res.status(400).send(e);
    })
});

// Route to create a user's Profile.

route.post('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let profile1= {};

    profile1.user = req.user.id;
    if(req.body.handle) profile1.handle = req.body.handle;
    if(req.body.company) profile1.company = req.body.company;
    if(req.body.location) profile1.location = req.body.company;
    if(req.body.website) profile1.website = req.body.website;
    if(req.body.status) profile1.status = req.body.status;
    if(req.body.skills) profile1.skills = req.body.skills;
    if(req.body.bio) profile1.bio = req.body.bio;
    if(req.body.githubUsername) profile1.githubUsername = req.body.githubUsername;
    if(typeof req.body.experience!== 'undefined') profile1.experience = req.body.experience.split(',');
    if(typeof req.body.education!=='undefined') profile1.education = req.body.education.split(',');
    if(req.body.Date) profile1.Date = req.body.Date;
    let social = {};
    if(req.body.youtube) social.youtube = req.body.youtube;
    if(req.body.twitter) social.twitter = req.body.twitter;
    if(req.body.facebook) social.facebook = req.body.facebook;
    if(req.body.linkedIn) social.linkedIn = req.body.linkedIn;
    if(req.body.instagram) social.instagram = req.body.instagram;
    
    if(social) profile1.social = social;
    console.log(profile1);
    Profile.findOne({user:req.user.id}).then(profile=>{
        if(profile){
            // Update the existing profile
            console.log('Inside if');
            Profile.findOneAndUpdate({user:req.body.id},{$set:{profile1}},{new:true})
            .then(profile=>res.json(profile1))
            .catch(e=>{res.send(e)});
        }else{
            // Create new profile
            console.log('Inside else');
            Profile.findOne({handle:req.body.handle}).then(handleExists=>{
                console.log('Inside find One');
                if(handleExists){
                    errors.handleAlreadyExists = 'This handle already exists';
                    res.status(400).send(errors);
                }
            });

            console.log('sdnbfi');
            let new_profile = new Profile(profile1).save().then(savedprofile=>{
                console.log("SavedProfile",savedprofile);
                res.send(savedprofile);
            }).catch(e=>{
                res.status(400).send(e);
            });
        }
    }).catch(e=>{
        res.status(400).json(e);
    })
});

// find profile by handle

route.get('/handle/:handle',(req,res)=>{
    Profile.findOne({handle:req.params.handle}).populate('user',['name','avatar']).then(profile=>{
        let errors ={};
        if(!profile){
            errors.noprofile = 'No profile found';
            res.status(404).json(errors);
        }

        res.status(200).json(profile);

    }).catch(e=>{
        res.status(400).send(e);
    })
});

// find profile by  User Id

route.get('/findById/:id',(req,res)=>{
    let errors ={};
    Profile.findOne({user:req.params.id}).populate('user',['name','avatar']).then(profile=>{
        if(!profile){
            errors.noprofile = 'No profile found';
            res.status(404).json(errors);
        }
        res.status(200).json(profile);
    }).catch(e=>{
        res.status(400).send(e);
    });
});

// Route to display all profiles.

route.get('/getAllProfiles',(req,res)=>{
    Profile.find().populate('user',['name','avatar']).then(profiles=>{
        res.status(200).json(profiles);
    }).catch(e=>{
        res.status(400).json(e);
    });
});

route.post('/addExperience',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        let errors={};
        if(!profile){
            errors.noprofile = 'No profile found';
            return res.json(errors);
        }

        let new_exp = {};
        if(req.body.title) new_exp.title = req.body.title;
        if(req.body.company) new_exp.company = req.body.company;
        if(req.body.location) new_exp.location = req.body.location;
        if(req.body.from) new_exp.from = req.body.from;
        if(req.body.to) new_exp.to = req.body.to;
        if(req.body.description) new_exp.description = req.body.description;

        profile.experience.unshift(new_exp);

        profile.save().then(profile=>{
            res.status(200).json(profile);
        }).catch(e=>{
            res.status(400).json(e);
        });


    }).catch(e=>{
        res.status(400).json(e);
    });
});

// add education

route.post('/addEducation',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        let errors={};
        if(!profile){
            console.log('inside error');
            errors.noprofile = 'No profile found';
            return res.json(errors);
        }

        let new_edu = {};
        if(req.body.school) new_edu.school = req.body.school;
        if(req.body.degree) new_edu.degree = req.body.degree;
        if(req.body.fieldOfStudy) new_edu.fieldOfStudy = req.body.fieldOfStudy;
        if(req.body.from) new_edu.from = req.body.from;
        if(req.body.to) new_edu.to = req.body.to;
        if(req.body.description) new_edu.description = req.body.description;

        profile.education.unshift(new_edu);
        profile.save().then(savedprofile=>{
            res.status(200).json(savedprofile);
        }).catch(e=>{
            res.status(400).json(e);
        });
    }).catch(e=>{
        res.status(400).json(e);
    });
});

route.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    Profile.findOne({user:req.user.id}).then(profile=>{
    var exp_index = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
    profile.experience.splice(exp_index,1);
    profile.save().then(updatedProfile=>{
        res.status(200).json(updatedProfile);
    }).catch(e=>{
        res.status(400).json(e);
    })
    }).catch(e=>{
        res.status(400).send(e);
    });
});

route.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        var removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex,1);

        profile.save().then(updated=>{
            res.status(200).json(updated);
        }).catch(e=>{
            res.status(400).json(e);
        });
    }).catch(e=>{
        res.status(400).json(e);
    })
})


module.exports = route;