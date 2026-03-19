const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    tagline: { type: String },
    shortDescription: { type: String, required: true },
    
    contentMode: { 
        type: String, 
        enum: ['structured', 'custom'], 
        default: 'structured' 
    },
    
    // For Structured Mode
    structuredContent: {
        sections: [{
            type: { type: String }, // 'text', 'image', 'video', 'gallery', 'features', 'code', 'demo', 'architecture', 'timeline'
            content: { type: mongoose.Schema.Types.Mixed },
            order: { type: Number }
        }]
    },
    
    // For Custom Mode
    customCode: { type: String }, // HTML / Markdown / JSX

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
    videoLinks: [{ type: String }],
    demoLinks: [{ type: String }],
    
    themeTemplate: { 
        type: String, 
        enum: ['Grid', 'Card', 'Featured', 'Carousel', 'Masonry'], 
        default: 'Card' 
    },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
