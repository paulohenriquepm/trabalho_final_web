const Class = require('../models/Class.js');

class ShowClassService {
    async execute(id) {
        const foundClass = await Class.findById({ _id: id });

        return foundClass;
    }
}

module.exports = ShowClassService;