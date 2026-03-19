const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    siteName: { type: String, default: 'Sonu Prasad' },
    siteDescription: { type: String, default: 'Portfolio & Blog' },
    homepageTemplate: { 
        type: String, 
        enum: ['Centered Hero', 'Split Screen', 'Animated Intro', 'Futuristic AI'],
        default: 'Centered Hero' 
    },
    globalTheme: { type: String, enum: ['light', 'dark', 'luxury'], default: 'light' },
    githubUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    twitterUrl: { type: String, default: '' },
    contactEmail: { type: String, default: '' },
    resumeUrl: { type: String, default: '' }
}, { timestamps: true });

// Ensure we only ever have ONE settings document
SettingsSchema.statics.getGlobalSettings = async function() {
    let settings = await this.findOne();
    if (!settings) {
        settings = await this.create({});
    }
    return settings;
};

module.exports = mongoose.model('Settings', SettingsSchema);
