const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    fullContent: { type: String, required: true }, // Markdown
    techStack: [{ type: String }],
    category: { 
        type: String, 
        enum: ['AI/ML', 'IoT', 'Web Development', 'Other'] 
    },
    status: { 
        type: String, 
        enum: ['Completed', 'Ongoing', 'Planned'] 
    },
    githubUrl: { type: String },
    liveDemoUrl: { type: String },
    coverImage: { type: String },
    galleryImages: [{ type: String }],
    themeTemplate: { 
        type: String, 
        enum: ['Grid', 'Card', 'Featured', 'Carousel', 'Masonry'], 
        default: 'Card' 
    },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
