const mongoose = require('mongoose');
require('dotenv').config();
const Experience = require('./models/Experience');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const initialExperiences = [
    {
        year: '2021',
        title: 'Began CS Journey',
        description: 'Started B.Tech in Computer Science. Mastered core fundamentals in C++ and Java. Developed algorithmic thinking through Data Structures and Object-Oriented Programming methodologies.',
        icon: 'Code',
        order: 1,
        status: 'published'
    },
    {
        year: '2022',
        title: 'Explored Web & IoT',
        description: 'Dived into full-stack web development using HTML/CSS/JS. Simultaneously experimented with Arduino microcontrollers, sparking an interest in hardware-software integration for IoT.',
        icon: 'Server',
        order: 2,
        status: 'published'
    },
    {
        year: '2023',
        title: 'AI & Machine Learning Focus',
        description: 'Shifted focus towards data intelligence. Built predictive models using Python, Pandas, and Scikit-learn. Developed the AI Sentiment Analyzer and Student Performance Predictor.',
        icon: 'BrainCircuit',
        order: 3,
        status: 'published'
    },
    {
        year: '2024 - Present',
        title: 'Full-Stack Intelligent Systems',
        description: 'Bridging the gap between AI, IoT, and premium UI. Building production-grade React apps, integrating complex Node/Express APIs, and deploying end-to-end intelligent solutions.',
        icon: 'Rocket',
        order: 4,
        status: 'published'
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('🌱 Connected to MongoDB for seeding...');

        // Clear existing experiences if any? No, only add if empty or user wants fresh start.
        // For this task, we'll ensure these are present.
        for (const exp of initialExperiences) {
            const exists = await Experience.findOne({ title: exp.title });
            if (!exists) {
                await Experience.create(exp);
                console.log(`✅ Seeded: ${exp.title}`);
            } else {
                console.log(`⏭️ Skipped (already exists): ${exp.title}`);
            }
        }

        console.log('✅ Seeding completed!');
        process.exit();
    } catch (err) {
        console.error('❌ Seeding error:', err);
        process.exit(1);
    }
}

seed();
