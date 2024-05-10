const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the user who is following
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    following: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the user being followed
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Follow', followSchema);
