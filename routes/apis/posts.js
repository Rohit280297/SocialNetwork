const express = require('express');
const {Post} =require('../../models/Post');
const {Profile} = require('../../models/Profile');
const route = express.Router();
const passport = require('passport');

route.get('/test',(req,res)=>res.json({message:"Posts is working"}));

route.post('/createPost',passport.authenticate('jwt',{session:false}),(req,res)=>{
    var newPost = new Post({
        user: req.user.id,
        name: req.body.name,
        text:req.body.text
    });

    newPost.save().then(post=>{
        res.status(200).json(post);
    }).catch(e=>{
        res.status(400).json(e);
    });
});

// Route to get all posts;
route.get('/all',(req,res)=>{
    Post.find().sort({date:-1}).then(posts=>{
        if(posts.length== 0){
            res.status(200).json({empty:'No Posts Found'});
        }
        res.status(200).json(posts);
    }).catch(e=>{
        res.status(404).json(e);
    })
});


// Route to delete a particular post

route.delete('/post/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.find({user:req.user.id}).then(profile=>{
        Post.findById(req.params.id).then(post=>{
            if(post.user.toString() !== req.user.id){
                res.status(401).json({UnAuthorized});
            }

            post.remove().then(()=>res.status(200).json({Success:"true"})).catch(e=>{
                res.status(400).json(e);
            });
        }).catch(e=>{
            res.status(404).json(e);
        })
    }) 
});

// route to like a post

route.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        Post.findById(req.params.id).then(post=>{
            if(post.likes.filter(like=>like.user.toString() === req.user.id).length>0){
                res.status(400).json({'alreadyLiked':'You have already liked this post'});
            }
            post.likes.unshift({user:req.user.id});

            post.save().then(post=>{
                res.status(200).json(post);
            }).catch(e=>{
                res.status(400).json(e);
            })
        }).catch(e=>{
            res.status(404).json(e);
        })
    }).catch(e=>{
        res.status(404).json(e);
    })
});

// Route to dislike the Post

route.post('/dislike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        Post.findById(req.params.id).then(post=>{
            if(post.likes.filter(like=>like.user.toString() === req.user.id).length==0){
                res.status(400).json({'notLiked':'You havent yet liked this post'});
            }
            let removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id);

            post.likes.splice(removeIndex,1);

            post.save().then(post=>{
                res.status(200).json(post);
            }).catch(e=>{
                res.status(400).json(e);
            })
        }).catch(e=>{
            res.status(404).json(e);
        })
    }).catch(e=>{
        res.status(404).json(e);
    })
});

// Route to add a comment to the post

route.post('/post/addComment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        Post.findById(req.params.id).then(post=>{
            var newComment = {
                user: req.user.id,
                text:req.body.text
            }
            post.comments.unshift(newComment);

            post.save().then(post=>{
                res.status(200).json({'success':'Comment Successfully Added',post});
            }).catch(e=>{
                res.status(404).json({'notfound':'Post not found'});
            })
        }).catch(e=>{
            res.status(400).json(e);
        })
    })
});

// Route to remove a comment

route.delete('/removeComment/:post_id/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Post.findById(req.params.post_id).then(post=>{
        if(post.comments.filter(comment=>comment.id.toString()=== req.params.id).length===0){
            res.status(404).json({'commentNotFound':'Comment not found'});
        }

        var removeIndex = post.comments.map(comment=>comment.id).indexOf(req.params.id);

        post.comments.splice(removeIndex,1);

        post.save().then(post=>{
            res.status(200).json({'success':'Comment removed successfully'});
        }).catch(e=>{
            res.status(400).json({'failure':'Cannot delete the comment'});
        })

    }).catch(e=>{
        res.status(404).json({'commentNotFound':'The comment is not found'});
    })
});




module.exports = route;