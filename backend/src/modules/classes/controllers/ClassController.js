const ListClassesService = require('../services/ListClassesService');
const ShowClassService = require('../services/ShowClassService');
const CreateClassService = require('../services/CreateClassService');
const UpdateClassService = require('../services/UpdateClassService');
const DeleteClassService = require('../services/DeleteClassService');

class ClassController {
    async index(req, res) {
        const listClasses = new ListClassesService();

        const classes = await listClasses.execute();

        return res.json(classes);
    }

    async show(req, res) {
        const { id } = req.params;

        const showClass = new ShowClassService();

        const foundClass = await showClass.execute(id);

        return res.json(foundClass);
    }

    async store(req, res) {
        const createClass = new CreateClassService();

        const createdClass = await createClass.execute(req.body);

        return res.json(createdClass);
    }

    async update(req, res) {
        const { id } = req.params;

        const updateClass = new UpdateClassService();

        const updatedClass = await updateClass.execute({
            id,
            data: req.body
        });

        return res.json(updatedClass);
    }

    async delete(req, res) {
        const { id } = req.params;

        const deleteClass = new DeleteClassService();

        await deleteClass.execute(id);

        return res.sendStatus(204);
    }
}

module.exports = ClassController;