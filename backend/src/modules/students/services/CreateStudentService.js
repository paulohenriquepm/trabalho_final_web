const Student = require('../models/Student.js');
const Class = require('../../classes/models/Class.js');

class CreateStudentService {
    async execute(data) {
        const student = await Student.create(data);

        const { class: class_id } = data;

        await Class.findByIdAndUpdate(
            class_id,
            { $push: { students: student._id } },
            { new: true, useFindAndModify: false }
        );

        return student;
    }
}

module.exports = CreateStudentService;