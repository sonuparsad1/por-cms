const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/GalleryController');
const auth = require('../middleware/authMiddleware');

router.route('/')
    .get(galleryController.getGalleryItems)
    .post(auth, galleryController.createGalleryItem);

router.route('/:id')
    .get(galleryController.getGalleryItem)
    .patch(auth, galleryController.updateGalleryItem)
    .put(auth, galleryController.updateGalleryItem)
    .delete(auth, galleryController.deleteGalleryItem);

module.exports = router;
