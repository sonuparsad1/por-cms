const Project = require('../models/Project');
const crudFactory = require('./crudFactory');

exports.getRelatedProjects = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
        const project = isMongoId 
            ? await Project.findById(id) 
            : await Project.findOne({ slug: id });
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const related = await Project.find({
            _id: { $ne: project._id },
            $or: [
                { category: project.category },
                { techStack: { $in: project.techStack } }
            ]
        }).limit(3);

        res.status(200).json({ data: related });
    } catch (err) {
        next(err);
    }
};

exports.getAllProjects = crudFactory.getAll(Project);
exports.getProject = crudFactory.getOne(Project);
exports.createProject = crudFactory.createOne(Project);
exports.updateProject = crudFactory.updateOne(Project);
exports.deleteProject = crudFactory.deleteOne(Project);
