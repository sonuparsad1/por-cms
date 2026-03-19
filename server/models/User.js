const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' },
    lastLogin: { type: Date }
}, { timestamps: true });

UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);
