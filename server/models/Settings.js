const mongoose = require('mongoose');

const NavItemSchema = new mongoose.Schema({
    id: String,
    label: String,
    href: String,
    isExternal: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
}, { _id: false });

const PageSEOSchema = new mongoose.Schema({
    page: String,
    metaTitle: String,
    metaDescription: String,
    ogImage: String,
    robots: { type: String, default: 'index, follow' }
}, { _id: false });

const SettingsSchema = new mongoose.Schema({
    // Site Info
    siteName: { type: String, default: 'Sonu Prasad' },
    siteDescription: { type: String, default: 'Portfolio & Blog' },
    logoUrl: { type: String, default: '' },
    faviconUrl: { type: String, default: '' },
    
    // Homepage
    homepageTemplate: {
        type: String,
        enum: ['Centered Hero', 'Split Screen', 'Animated Intro', 'Futuristic AI'],
        default: 'Centered Hero'
    },

    // Theme
    globalTheme: { type: String, enum: ['light', 'dark', 'luxury'], default: 'dark' },
    primaryColor: { type: String, default: '#3d2b1f' },
    accentColor: { type: String, default: '#c87941' },
    fontFamily: { type: String, default: "'Inter', sans-serif" },
    borderRadius: { type: Number, default: 12 },

    // Navigation
    navItems: { type: [NavItemSchema], default: [] },

    // SEO
    metaTitle: { type: String, default: 'Sonu Prasad | Portfolio' },
    metaDescription: { type: String, default: 'Portfolio of Sonu Prasad - Developer & Engineer' },
    googleAnalyticsId: { type: String, default: '' },
    pagesSEO: { type: [PageSEOSchema], default: [] },

    // Social
    githubUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    twitterUrl: { type: String, default: '' },
    instagramUrl: { type: String, default: '' },
    youtubeUrl: { type: String, default: '' },
    contactEmail: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },

    // CMS
    maintenanceMode: { type: Boolean, default: false },
    allowTestimonials: { type: Boolean, default: true },
    allowContactForm: { type: Boolean, default: true },
}, { timestamps: true });

SettingsSchema.statics.getGlobalSettings = async function() {
    let settings = await this.findOne();
    if (!settings) settings = await this.create({});
    return settings;
};

module.exports = mongoose.model('Settings', SettingsSchema);
