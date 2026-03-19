require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Added path module

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Files natively (For local Image uploads)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Database Connection
const connectDB = async () => {
    if (!process.env.MONGODB_URI && process.env.NODE_ENV === 'production') {
        console.error('❌ FATAL: MONGODB_URI is not defined in Production Environment.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000 // Increased for cloud cold-starts
        });
        console.log('✅ MongoDB_Connection: Established_Successfully');
    } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            console.log('\n⚠️  Local MongoDB Connection Failed: Spawning an In-Memory Database for development...');
            const mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('✅ In-Memory MongoDB running successfully. You can now test the Admin features locally! \n');
        } else {
            console.error('❌ PRODUCTION_ERROR: MongoDB Connection Logic Failed.', err.message);
        }
    }
};
connectDB();

// Routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api/index');
const uploadRoutes = require('./routes/upload');

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

// Global Error Handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Vercel Serverless Export Architecture
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`[DEV RUNTIME] Protocol_Active // Port_${PORT}`);
    });
}

module.exports = app;
