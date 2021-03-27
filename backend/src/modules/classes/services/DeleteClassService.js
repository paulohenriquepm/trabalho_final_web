const Class = require('../models/Class.js');

class DeleteClassService {
    async execute(id) {
        await Class.deleteOne({ _id: id });
    }
}

module.exports = DeleteClassService;