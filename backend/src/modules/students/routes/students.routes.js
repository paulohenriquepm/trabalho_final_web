  
const Router = require('express');

const StudentController = require('../controllers/StudentController');

const studentsRouter = Router();

const studentController = new StudentController();

studentsRouter.get('/', studentController.index);
studentsRouter.get('/:id', studentController.show);
studentsRouter.put('/:id', studentController.update);
studentsRouter.post('/', studentController.store);
studentsRouter.delete('/:id', studentController.delete);

module.exports = studentsRouter;