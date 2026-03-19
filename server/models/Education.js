const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Currently Pursuing', 'Completed', 'Dropped'],
        default: 'Currently Pursuing'
    },
    description: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);
