const express = require('express');
const router = express.Router();

const projectRoutes = require('./projectRoutes');
const blogRoutes = require('./blogRoutes');
const messageRoutes = require('./messageRoutes');
const otherRoutes = require('./otherRoutes');
const experienceRoutes = require('../experienceRoutes');
const educationRoutes = require('../educationRoutes');
const skillCategoryRoutes = require('../skillCategoryRoutes');
const galleryRoutes = require('../galleryRoutes');

const Project = require('../../models/Project');
const Blog = require('../../models/Blog');
const Message = require('../../models/Message');
const Settings = require('../../models/Settings');
const auth = require('../../middleware/authMiddleware');
const crudFactory = require('../../controllers/crudFactory');

const analyticsRoutes = require('./analyticsRoutes');
const auditLogger = require('../../middleware/auditLogger');

// Apply audit logging to all API routes
router.use(auditLogger);

// Mount modular routes
router.use('/projects', projectRoutes);
router.use('/blogs', blogRoutes);
router.use('/messages', messageRoutes);
router.use('/experience', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/skills', skillCategoryRoutes);
router.use('/gallery', galleryRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/', otherRoutes);

// Stats & Settings (keeping these in index for now as they are specialized)
router.get('/stats', auth, async (req, res, next) => {
    try {
        const [projects, blogs, messages] = await Promise.all([
            Project.countDocuments(),
            Blog.countDocuments(),
            Message.countDocuments()
        ]);
        res.status(200).json({ projects, blogs, messages });
    } catch (err) {
        next(err);
    }
});

router.get('/settings', async (req, res, next) => {
    try {
        const settings = await Settings.getGlobalSettings();
        res.status(200).json({ data: [settings] });
    } catch (err) {
        next(err);
    }
});

router.put('/settings/:id', auth, crudFactory.updateOne(Settings));

// Database Export (Admin only)
router.get('/export', auth, async (req, res, next) => {
    try {
        const [
            projects, blogs, messages, settings, 
            experience, education, skills, gallery, 
            auditLogs, achievements, certifications, 
            testimonials, faqs, pageViews
        ] = await Promise.all([
            Project.find(),
            Blog.find(),
            Message.find(),
            Settings.find(),
            require('../../models/Experience').find(),
            require('../../models/Education').find(),
            require('../../models/SkillCategory').find(),
            require('../../models/GalleryItem').find(),
            require('../../models/AuditLog').find(),
            require('../../models/Achievement').find(),
            require('../../models/Certification').find(),
            require('../../models/Testimonial').find(),
            require('../../models/FAQ').find(),
            require('../../models/PageView').find()
        ]);

        const exportData = {
            exportDate: new Date(),
            collections: {
                projects,
                blogs,
                messages,
                settings,
                experience,
                education,
                skills,
                gallery,
                auditLogs,
                achievements,
                certifications,
                testimonials,
                faqs,
                pageViews
            }
        };

        res.status(200).json(exportData);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
