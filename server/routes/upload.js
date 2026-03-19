const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/authMiddleware');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Determine storage engine based on environment variables
let storage;
const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                     process.env.CLOUDINARY_API_KEY && 
                     process.env.CLOUDINARY_API_SECRET;

const isNotPlaceholder = hasCloudinary && 
                        !process.env.CLOUDINARY_CLOUD_NAME.includes('your_') &&
                        !process.env.CLOUDINARY_API_KEY.includes('your_');

const useCloudinary = isNotPlaceholder;

if (useCloudinary) {
    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'portfolio_uploads',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
            transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
        }
    });
    console.log('Using Cloudinary for image uploads');
} else {
    // Configure Multer Disk Storage Engine (Fallback)
    storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, uploadDir);
        },
        filename: function(req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });
    console.log('Cloudinary credentials missing. Falling back to Local Storage.');
}

// Implement file validation and upload middlewear
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Single file upload
router.post('/', auth, upload.single('image'), (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
        // Use Cloudinary path if available, else use relative web path for local
        const imageUrl = useCloudinary ? req.file.path : `/uploads/${req.file.filename}`;
        res.status(200).json({ url: imageUrl, message: 'Image uploaded successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error processing upload', error: err.message });
    }
});

// Multi-file upload
router.post('/bulk', auth, upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        const urls = req.files.map(file => useCloudinary ? file.path : `/uploads/${file.filename}`);
        res.status(200).json({ urls, message: `${req.files.length} images uploaded successfully` });
    } catch (err) {
        res.status(500).json({ message: 'Error processing bulk upload', error: err.message });
    }
});

// List all uploaded files (Admin only)
router.get('/list', auth, (req, res) => {
    try {
        fs.readdir(uploadDir, (err, files) => {
            if (err) return res.status(500).json({ message: 'Unable to scan files' });
            const fileList = files.map(file => ({
                name: file,
                url: `/uploads/${file}`,
                size: fs.statSync(path.join(uploadDir, file)).size,
                mtime: fs.statSync(path.join(uploadDir, file)).mtime
            }));
            res.status(200).json({ data: fileList });
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching file list', error: err.message });
    }
});

// Delete file (Admin only)
router.delete('/:filename', auth, (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.status(200).json({ message: 'File deleted successfully' });
    } else {
        res.status(404).json({ message: 'File not found' });
    }
});

module.exports = router;
