const Class = require('../models/Class.js');

class CreateClassService {
    async execute(data) {
        const createdClass = await Class.create(data);

        return createdClass;
    }
}

module.exports = CreateClassService;