const Student = require('../models/Student.js');

class DeleteStudentService {
    async execute(id) {
        await Student.deleteOne({ _id: id });
    }
}

module.exports = DeleteStudentService;