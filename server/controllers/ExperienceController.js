const Experience = require('../models/Experience');

exports.createExperience = async (req, res, next) => {
    try {
        const doc = await Experience.create(req.body);
        res.status(201).json({
            status: 'success',
            data: doc
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getExperiences = async (req, res, next) => {
    try {
        const docs = await Experience.find().sort({ order: 1 });
        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: docs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPublishedExperiences = async (req, res, next) => {
    try {
        const docs = await Experience.find({ status: 'published' }).sort({ order: 1 });
        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: docs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateExperience = async (req, res, next) => {
    try {
        const doc = await Experience.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true
        });
        if (!doc) return res.status(404).json({ message: 'Experience not found' });
        res.status(200).json({
            status: 'success',
            data: doc
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteExperience = async (req, res, next) => {
    try {
        const doc = await Experience.findByIdAndDelete(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Experience not found' });
        res.status(200).json({ 
            status: 'success',
            message: 'Experience deleted' 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
