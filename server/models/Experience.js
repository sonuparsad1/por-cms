const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: String, required: true }, // using string for flexibility (e.g., '2023 - Present')
    description: { type: String, required: true },
    icon: { type: String, default: '' },
    image: { type: String, default: '' },
    order: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['published', 'draft'], 
        default: 'published' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
