const mongoose = require('mongoose');

const LearningProgressSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['AI', 'ML', 'Web Dev', 'DSA', 'System Design'] 
    },
    status: { 
        type: String, 
        enum: ['Planned', 'In Progress', 'Completed'] 
    },
    progressPercentage: { type: Number, min: 0, max: 100 },
    milestones: [{ type: String }],
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LearningProgress', LearningProgressSchema);
