const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    dateIssued: { type: Date, required: true },
    description: { type: String },
    credentialUrl: { type: String },
    credentialId: { type: String },
    image: { type: String },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Certification', CertificationSchema);
