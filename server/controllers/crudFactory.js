exports.getAll = (Model) => async (req, res, next) => {
    try {
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 1. Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        let query = Model.find(JSON.parse(queryStr));

        // 2. Search Logic
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            // Dynamically search across title, name, or content fields if they exist
            query = query.find({
                $or: [
                    { title: searchRegex },
                    { name: searchRegex },
                    { summary: searchRegex },
                    { tags: searchRegex }
                ]
            });
        }

        // 3. Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // 4. Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        const docs = await query;
        const total = await Model.countDocuments(JSON.parse(queryStr));

        res.status(200).json({
            status: 'success',
            results: docs.length,
            total,
            page,
            data: docs
        });
    } catch (err) {
        next(err);
    }
};

exports.getOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Document not found' });
        res.status(200).json({
            status: 'success',
            data: doc
        });
    } catch (err) {
        next(err);
    }
};

exports.createOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body);
        res.status(201).json({
            status: 'success',
            data: doc
        });
    } catch (err) {
        next(err);
    }
};

exports.updateOne = (Model) => async (req, res, next) => {
    try {
        const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedDoc) return res.status(404).json({ message: 'Document not found' });
        res.status(200).json({
            status: 'success',
            data: updatedDoc
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Document not found' });
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
};
