const Project = require('../models/Project');
const crudFactory = require('./crudFactory');

exports.getRelatedProjects = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
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
