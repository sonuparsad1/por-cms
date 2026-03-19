const mongoose = require('mongoose');
require('dotenv').config();
const Education = require('./models/Education');
const SkillCategory = require('./models/SkillCategory');

const MONGODB_URI = process.env.MONGODB_URI;

const educations = [
    {
        degree: 'B.Tech in Computer Science & Engineering',
        institution: 'University / Institute Name',
        duration: '2025 – 2029',
        status: 'Currently Pursuing',
        description: 'Focusing on AI/ML, Data Structures, Algorithms, and Software Engineering. Consistently mastering core CS fundamentals.',
        order: 1
    }
];

const skillCategories = [
    {
        title: "Programming Languages",
        icon: 'Code2',
        skills: [
            { name: "Python", level: 85 },
            { name: "C++", level: 80 },
            { name: "Java", level: 75 },
            { name: "JavaScript", level: 90 }
        ],
        order: 1
    },
    {
        title: "Technical Stack",
        icon: 'Terminal',
        skills: [
            { name: "React / Next.js", level: 95 },
            { name: "Node.js / Express", level: 85 },
            { name: "MongoDB / SQL", level: 80 },
            { name: "Cloud Integration", level: 70 }
        ],
        order: 2
    },
    {
        title: "AI & Machine Learning",
        icon: 'BrainCircuit',
        isSpecial: true,
        skills: [
            { name: "Supervised Learning", level: 75 },
            { name: "Neural Networks", level: 70 },
            { name: "Model Training", level: 65 },
            { name: "NLP", level: 60 }
        ],
        order: 3
    }
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('🌱 Seeding Resume data...');

        for (const edu of educations) {
            await Education.findOneAndUpdate({ degree: edu.degree }, edu, { upsert: true });
        }
        for (const cat of skillCategories) {
            await SkillCategory.findOneAndUpdate({ title: cat.title }, cat, { upsert: true });
        }

        console.log('✅ Resume data seeded!');
        process.exit();
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seed();
