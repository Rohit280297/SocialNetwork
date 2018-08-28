const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
        default:null
    },
    text:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:null
    },
    likes:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    }],
    comments:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        },
        text:{
            type:String,
            required:true
        }
    }]
});


const Post = mongoose.model('Post',PostSchema);

module.exports={Post};