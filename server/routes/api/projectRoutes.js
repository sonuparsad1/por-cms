const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/projectController');
const auth = require('../../middleware/authMiddleware');

router.route('/')
    .get(projectController.getAllProjects)
    .post(auth, projectController.createProject);

router.route('/:id')
    .get(projectController.getProject)
    .put(auth, projectController.updateProject)
    .delete(auth, projectController.deleteProject);

module.exports = router;
