const express = require('express');
const router = express.Router();
const skillCategoryController = require('../controllers/SkillCategoryController');
const auth = require('../middleware/authMiddleware');

router.route('/')
    .get(skillCategoryController.getSkillCategories)
    .post(auth, skillCategoryController.createSkillCategory);

router.route('/:id')
    .put(auth, skillCategoryController.updateSkillCategory)
    .delete(auth, skillCategoryController.deleteSkillCategory);

module.exports = router;
