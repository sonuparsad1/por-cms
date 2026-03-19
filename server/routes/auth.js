const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const auth = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/setup', authController.registerInitialAdmin);
router.post('/change-password', auth, authController.changePassword);

module.exports = router;
