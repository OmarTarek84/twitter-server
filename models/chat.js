const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatName: {
        type: String,
        trim: true,
        default: null
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    latestMessage: {
        type: Schema.Types.Mixed,
        ref: 'Message'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Chat', chatSchema);