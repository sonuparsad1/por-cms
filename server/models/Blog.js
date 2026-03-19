const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    summary: { type: String, required: true },
    content: { type: String, required: true }, // Markdown
    category: { type: String, required: true },
    tags: [{ type: String }],
    coverImage: { type: String },
    themeTemplate: { 
        type: String, 
        enum: ['Minimal', 'Magazine', 'Split', 'Image-Heavy'], 
        default: 'Minimal' 
    },
    author: { type: String, default: 'Sonu Prasad' },
    readTime: { type: Number },
    isPublished: { type: Boolean, default: false },
    views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
