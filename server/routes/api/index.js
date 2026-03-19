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

// Mount modular routes
router.use('/projects', projectRoutes);
router.use('/blogs', blogRoutes);
router.use('/messages', messageRoutes);
router.use('/experience', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/skills', skillCategoryRoutes);
router.use('/gallery', galleryRoutes);
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

module.exports = router;
