const Project = require('../models/Project');
const crudFactory = require('./crudFactory');

exports.getAllProjects = crudFactory.getAll(Project);
exports.getProject = crudFactory.getOne(Project);
exports.createProject = crudFactory.createOne(Project);
exports.updateProject = crudFactory.updateOne(Project);
exports.deleteProject = crudFactory.deleteOne(Project);
