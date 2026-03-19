const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String },
    company: { type: String },
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    avatar: { type: String },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
