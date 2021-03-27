const Student = require('../models/Student.js');

class ShowStudentService {
    async execute(id) {
        const student = await Student.findById({ _id: id });

        return student;
    }
}

module.exports = ShowStudentService;