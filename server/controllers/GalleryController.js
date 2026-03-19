const GalleryItem = require('../models/GalleryItem');
const factory = require('./crudFactory');

// Standard admin-protected write operations using the factory
exports.createGalleryItem = factory.createOne(GalleryItem);
exports.updateGalleryItem = factory.updateOne(GalleryItem);
exports.deleteGalleryItem = factory.deleteOne(GalleryItem);

// Customized read operations
exports.getGalleryItems = async (req, res, next) => {
    try {
        const query = req.user ? {} : { status: 'published' };
        const items = await GalleryItem.find(query).sort({ order: 1, createdAt: -1 });
        
        res.status(200).json({
            status: 'success',
            results: items.length,
            data: items
        });
    } catch (err) {
        next(err);
    }
};

exports.getGalleryItem = factory.getOne(GalleryItem);
