const express = require('express');
const router = express.Router();
const educationController = require('../controllers/EducationController');
const auth = require('../middleware/authMiddleware');

router.route('/')
    .get(educationController.getEducations)
    .post(auth, educationController.createEducation);

router.route('/:id')
    .put(auth, educationController.updateEducation)
    .delete(auth, educationController.deleteEducation);

module.exports = router;
