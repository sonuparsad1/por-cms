const mongoose = require('mongoose');

const PageViewSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        index: true
    },
    ip: String,
    userAgent: String,
    referrer: String,
    sessionID: {
        type: String,
        index: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true
    }
});

module.exports = mongoose.model('PageView', PageViewSchema);
