const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: 'http://localhost:8080/images/profilePic.jpeg'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Post'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Post'
    }],
    retweets: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Post'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);