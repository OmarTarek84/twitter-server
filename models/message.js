const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: {
        type: String,
        trim: true,
        required: true
    },
    readBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);