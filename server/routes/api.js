const express = require('express');
const router = express.Router();
const crudFactory = require('../controllers/crudFactory');
const auth = require('../middleware/authMiddleware');

const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Message = require('../models/Message');
const Certification = require('../models/Certification');
const Achievement = require('../models/Achievement');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const LearningProgress = require('../models/LearningProgress');
const Settings = require('../models/Settings');

const generateRoutes = (path, Model) => {
    if (path !== 'messages') {
        router.get(`/${path}`, crudFactory.getAll(Model));
        router.get(`/${path}/:id`, crudFactory.getOne(Model));
        router.post(`/${path}`, auth, crudFactory.createOne(Model));
    } else {
        router.post(`/${path}`, crudFactory.createOne(Model));
        router.get(`/${path}`, auth, crudFactory.getAll(Model));
        router.get(`/${path}/:id`, auth, crudFactory.getOne(Model));
    }
    
    router.put(`/${path}/:id`, auth, crudFactory.updateOne(Model));
    router.delete(`/${path}/:id`, auth, crudFactory.deleteOne(Model));
};

generateRoutes('projects', Project);
generateRoutes('blogs', Blog);
generateRoutes('messages', Message);
generateRoutes('certifications', Certification);
generateRoutes('achievements', Achievement);
generateRoutes('testimonials', Testimonial);
generateRoutes('faqs', FAQ);
generateRoutes('learning', LearningProgress);

// Specialized routes for the Singleton Settings document
router.get('/stats', auth, async (req, res) => {
    try {
        const [projects, blogs, messages] = await Promise.all([
            Project.countDocuments(),
            Blog.countDocuments(),
            Message.countDocuments()
        ]);
        res.status(200).json({ projects, blogs, messages });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching stats', error: err.message });
    }
});
router.get('/settings', async (req, res) => {
    try {
        const settings = await Settings.getGlobalSettings();
        res.status(200).json({ data: [settings] });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching settings', error: err.message });
    }
});
router.put('/settings/:id', auth, crudFactory.updateOne(Settings));

module.exports = router;
