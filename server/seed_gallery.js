const mongoose = require('mongoose');
require('dotenv').config();
const GalleryItem = require('./models/GalleryItem');

const MONGODB_URI = process.env.MONGODB_URI;

const items = [
    {
        title: "Neural Engine Core",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000",
        category: "upload",
        description: "Initial architectural sketch of the predictive neural processing unit.",
        order: 1,
        status: "published"
    },
    {
        title: "IoT Sensor Array",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
        category: "upload",
        description: "Real-time verification of the hardware-software handshake for the smart farm project.",
        order: 2,
        status: "published"
    },
    {
        title: "Binary Drift Lab",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
        category: "upload",
        description: "Experimental workspace environment: where data becomes intelligence.",
        order: 3,
        status: "published"
    },
    {
        title: "Interface Synthesis",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
        category: "upload",
        description: "Component construction for the premium UI design system.",
        order: 4,
        status: "published"
    }
];

const seedGallery = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for Seeding...');

        // Upsert items based on title
        for (const item of items) {
            await GalleryItem.findOneAndUpdate(
                { title: item.title },
                item,
                { upsert: true, new: true }
            );
        }

        console.log('Gallery Seeding Completed successfully!');
        process.exit();
    } catch (err) {
        console.error('Seeding Error:', err);
        process.exit(1);
    }
};

seedGallery();
