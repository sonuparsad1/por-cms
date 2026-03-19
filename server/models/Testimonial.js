const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String },
    company: { type: String },
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    avatar: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
