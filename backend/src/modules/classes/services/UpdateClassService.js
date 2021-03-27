const Class = require('../models/Class.js');

class UpdateClassService {
    async execute({ id, data }) {
        const updatedClass = await Class.updateOne({ _id: id }, data);

        return updatedClass;
    }
}

module.exports = UpdateClassService;