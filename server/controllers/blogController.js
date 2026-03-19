const Blog = require('../models/Blog');
const crudFactory = require('./crudFactory');

exports.getAllBlogs = crudFactory.getAll(Blog);
exports.getBlog = crudFactory.getOne(Blog);
exports.createBlog = crudFactory.createOne(Blog);
exports.updateBlog = crudFactory.updateOne(Blog);
exports.deleteBlog = crudFactory.deleteOne(Blog);
