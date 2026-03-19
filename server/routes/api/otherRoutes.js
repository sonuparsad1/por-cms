const express = require('express');
const router = express.Router();
const crudFactory = require('../../controllers/crudFactory');
const auth = require('../../middleware/authMiddleware');

const Achievement = require('../../models/Achievement');
const Certification = require('../../models/Certification');
const FAQ = require('../../models/FAQ');
const Testimonial = require('../../models/Testimonial');
const LearningProgress = require('../../models/LearningProgress');

// Helper to register generic routes
const register = (path, Model) => {
    router.route(`/${path}`)
        .get(crudFactory.getAll(Model))
        .post(auth, crudFactory.createOne(Model));
    
    router.route(`/${path}/:id`)
        .get(crudFactory.getOne(Model))
        .put(auth, crudFactory.updateOne(Model))
        .delete(auth, crudFactory.deleteOne(Model));
};

register('achievements', Achievement);
register('certifications', Certification);
register('faqs', FAQ);
register('testimonials', Testimonial);
register('learning', LearningProgress);

module.exports = router;
