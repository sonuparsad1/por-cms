require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Added path module

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.CLIENT_URL
    ? [process.env.CLIENT_URL]
    : true; // Allow all if not set

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());

// Serve Static Files natively (For local Image uploads)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Database Connection
let isConnected = false; // Cache connection for serverless warm reuse

const connectDB = async () => {
    if (isConnected) return; // Reuse existing connection in warm serverless instances

    if (!process.env.MONGODB_URI) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('❌ FATAL: MONGODB_URI environment variable is not set on Vercel. Add it in Project Settings → Environment Variables.');
        }
        // Local dev fallback
        try {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            console.log('\n⚠️  No MONGODB_URI found: Spawning In-Memory DB for local dev...');
            const mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            await mongoose.connect(mongoUri);
            isConnected = true;
            console.log('✅ In-Memory MongoDB running. \n');
            return;
        } catch (memErr) {
            console.error('❌ In-Memory MongoDB failed:', memErr.message);
            return;
        }
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 15000
        });
        isConnected = true;
        console.log('✅ MongoDB_Connection: Established_Successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
        throw err; // Let the request fail visibly so logs show the real error
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
