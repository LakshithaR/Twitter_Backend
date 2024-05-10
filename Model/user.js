const mongoose = require('mongoose');

const { object } = require('underscore');
 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        sparse:true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        maxlength: 160 
    },
    location: {
        type: String
    },
    profileImage: {
        type: String
    },
    coverImage: {
        type: String
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    followerCount:{
        type:Number,
        default:0
    },
    followingCount:{
        type:Number,
        default:0
    },
    followers: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Follow'
        },
        name: {
            type: String
        }
    }],
    following: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Follow'
        },
        name: {
            type: String
        }
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' // Reference to the 'Post' collection
    }]
});

module.exports = mongoose.model('user', userSchema);