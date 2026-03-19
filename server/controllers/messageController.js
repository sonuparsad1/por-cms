const Message = require('../models/Message');
const crudFactory = require('./crudFactory');

exports.getAllMessages = crudFactory.getAll(Message);
exports.getMessage = crudFactory.getOne(Message);
exports.createMessage = crudFactory.createOne(Message);
exports.updateMessage = crudFactory.updateOne(Message);
exports.deleteMessage = crudFactory.deleteOne(Message);
