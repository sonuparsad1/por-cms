const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    replied: { type: Boolean, default: false },
    status: { 
        type: String, 
        enum: ['NEW', 'CONTACTED', 'WON', 'ARCHIVED'], 
        default: 'NEW' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
