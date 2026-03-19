const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    summary: { type: String, required: true },
    content: { type: String, required: true }, // Markdown
    category: { type: String, required: true },
    tags: [{ type: String }],
    coverImage: { type: String },
    
    author: { type: String, default: 'Sonu Prasad' },
    readTime: { type: Number, default: 5 },
    
    status: { 
        type: String, 
        enum: ['published', 'draft'], 
        default: 'published' 
    },
    
    views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
