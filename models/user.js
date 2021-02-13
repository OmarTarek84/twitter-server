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
        trim: true,
        unique: true,
        index: true
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
        default: 'https://twitter-clone-node.herokuapp.com/images/profilePic.jpeg'
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
    coverPhoto: {
        type: String,
        default: null
    },
    pinnedPost: {
        type: Schema.Types.Mixed,
        default: null,
        ref: 'Post'
    },
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);