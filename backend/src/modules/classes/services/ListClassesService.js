const Class = require('../models/Class.js');

class ListClassesService {
    async execute() {
        const classes = await Class.find({}).populate('students');

        return classes;
    }
}

module.exports = ListClassesService;