const Student = require('../models/Student.js');

class ListStudentsService {
    async execute() {
        const students = await Student.find({}).populate('class');

        return students;
    }
}

module.exports = ListStudentsService;