const ListStudentsService = require('../services/ListStudentsService');
const ShowStudentService = require('../services/ShowStudentService');
const CreateStudentService = require('../services/CreateStudentService');
const UpdateStudentService = require('../services/UpdateStudentService');
const DeleteStudentService = require('../services/DeleteStudentService');

class ClassController {
    async index(req, res) {
        const listStudents = new ListStudentsService();

        const students = await listStudents.execute();

        return res.json(students);
    }

    async show(req, res) {
        const { id } = req.params;

        const showStudent = new ShowStudentService();

        const student = await showStudent.execute(id);

        return res.json(student);
    }

    async store(req, res) {
        const createStudent = new CreateStudentService();

        const createdStudent = await createStudent.execute(req.body);

        return res.json(createdStudent);
    }

    async update(req, res) {
        const { id } = req.params;

        const updateStudent = new UpdateStudentService();

        const student = await updateStudent.execute({
            id,
            data: req.body
        });

        return res.json(student);
    }

    async delete(req, res) {
        const { id } = req.params;

        const deleteStudent = new DeleteStudentService();

        await deleteStudent.execute(id);

        return res.sendStatus(204);
    }
}

module.exports = ClassController;