const Blog = require('../models/Blog');
const crudFactory = require('./crudFactory');

exports.getRelatedBlogs = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
        const blog = isMongoId 
            ? await Blog.findById(id) 
            : await Blog.findOne({ slug: id });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const related = await Blog.find({
            _id: { $ne: blog._id },
            $or: [
                { category: blog.category },
                { tags: { $in: blog.tags } }
            ]
        }).limit(3);

        res.status(200).json({ data: related });
    } catch (err) {
        next(err);
    }
};

exports.getAllBlogs = crudFactory.getAll(Blog);
exports.getBlog = crudFactory.getOne(Blog);
exports.createBlog = crudFactory.createOne(Blog);
exports.updateBlog = crudFactory.updateOne(Blog);
exports.deleteBlog = crudFactory.deleteOne(Blog);
