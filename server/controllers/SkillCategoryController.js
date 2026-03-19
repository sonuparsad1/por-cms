const SkillCategory = require('../models/SkillCategory');

exports.createSkillCategory = async (req, res) => {
    try {
        const doc = await SkillCategory.create(req.body);
        res.status(201).json({ status: 'success', data: doc });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

exports.getSkillCategories = async (req, res) => {
    try {
        const docs = await SkillCategory.find().sort({ order: 1 });
        res.status(200).json({ status: 'success', results: docs.length, data: docs });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.updateSkillCategory = async (req, res) => {
    try {
        const doc = await SkillCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!doc) return res.status(404).json({ status: 'fail', message: 'Not found' });
        res.status(200).json({ status: 'success', data: doc });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

exports.deleteSkillCategory = async (req, res) => {
    try {
        const doc = await SkillCategory.findByIdAndDelete(req.params.id);
        if (!doc) return res.status(404).json({ status: 'fail', message: 'Not found' });
        res.status(200).json({ status: 'success', message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
