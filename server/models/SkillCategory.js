const mongoose = require('mongoose');

const SkillCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'Code2'
    },
    skills: [
        {
            name: String,
            level: { type: Number, min: 0, max: 100 }
        }
    ],
    isSpecial: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('SkillCategory', SkillCategorySchema);
