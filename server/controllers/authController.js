const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        
        user.lastLogin = new Date();
        await user.save();
        
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.registerInitialAdmin = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password || 'admin123', salt);

        const admin = new User({
            username: username || 'admin',
            email: email || 'sonusa470@gmail.com',
            passwordHash,
            role: 'admin'
        });

        await admin.save();
        res.status(201).json({ message: 'Initial admin created' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
