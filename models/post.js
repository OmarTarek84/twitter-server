const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: {
        type: String,
        trim: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'User'
    }],
    retweetUsers: [{
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'User'
    }],
    retweetData: {
        type: Schema.Types.Mixed,
        ref: 'Post'
    },
    replies: [{
        type: Object,
        replyUser: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        replyText: {
            type: String,
            trim: true
        }
    }],
    replyTo: {
        type: Schema.Types.Mixed,
        ref: 'Post',
        default: null
    }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);