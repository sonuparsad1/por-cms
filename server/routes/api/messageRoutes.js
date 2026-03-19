const express = require('express');
const router = express.Router();
const messageController = require('../../controllers/messageController');
const auth = require('../../middleware/authMiddleware');

router.route('/')
    .post(messageController.createMessage)
    .get(auth, messageController.getAllMessages);

router.route('/:id')
    .get(auth, messageController.getMessage)
    .put(auth, messageController.updateMessage)
    .delete(auth, messageController.deleteMessage);

module.exports = router;
