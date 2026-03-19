const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/blogController');
const auth = require('../../middleware/authMiddleware');

router.route('/')
    .get(blogController.getAllBlogs)
    .post(auth, blogController.createBlog);

router.route('/:id')
    .get(blogController.getBlog)
    .put(auth, blogController.updateBlog)
    .delete(auth, blogController.deleteBlog);

module.exports = router;
