const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/ExperienceController');
const auth = require('../middleware/authMiddleware');

// Public route for public timeline
router.get('/published', experienceController.getPublishedExperiences);

// Protected routes for Admin (add/edit/delete/list all including drafts)
router.get('/', auth, experienceController.getExperiences);
router.post('/', auth, experienceController.createExperience);
router.put('/:id', auth, experienceController.updateExperience);
router.delete('/:id', auth, experienceController.deleteExperience);

module.exports = router;
