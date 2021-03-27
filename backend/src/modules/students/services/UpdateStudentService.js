const Student = require('../models/Student.js');
const Class = require('../../classes/models/Class.js');

class UpdateStudentService {
    async execute({ id, data }) {
        const findStudent = await Student.findById(id);

        const { class: old_class } = findStudent;

        const { class: updated_class } = data;

        if (old_class !== updated_class) {
            await Class.findByIdAndUpdate(
                old_class,
                { $pull: { students: id} },
                { new: true, useFindAndModify: false }
            );

            await Class.findByIdAndUpdate(
                updated_class,
                { $push: { students: id } },
                { new: true, useFindAndModify: false }
            );
        }

        const updatedStudent = await Student.updateOne({ _id: id }, data);

        return updatedStudent;
    }
}

module.exports = UpdateStudentService;