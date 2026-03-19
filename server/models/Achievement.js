const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date },
    category: { 
        type: String, 
        enum: ['Hackathon', 'Academic', 'Project', 'Other'] 
    },
    description: { type: String },
    metrics: { type: String }, // e.g., "1st Place out of 50 teams"
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Achievement', AchievementSchema);
