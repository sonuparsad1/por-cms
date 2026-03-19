const Education = require('../models/Education');

exports.createEducation = async (req, res) => {
    try {
        const doc = await Education.create(req.body);
        res.status(201).json({ status: 'success', data: doc });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

exports.getEducations = async (req, res) => {
    try {
        const docs = await Education.find().sort({ order: 1 });
        res.status(200).json({ status: 'success', results: docs.length, data: docs });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.updateEducation = async (req, res) => {
    try {
        const doc = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!doc) return res.status(404).json({ status: 'fail', message: 'Not found' });
        res.status(200).json({ status: 'success', data: doc });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

exports.deleteEducation = async (req, res) => {
    try {
        const doc = await Education.findByIdAndDelete(req.params.id);
        if (!doc) return res.status(404).json({ status: 'fail', message: 'Not found' });
        res.status(200).json({ status: 'success', message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
