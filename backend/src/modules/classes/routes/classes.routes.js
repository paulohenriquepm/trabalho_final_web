  
const Router = require('express');

const ClassController = require('../controllers/ClassController');

const classesRouter = Router();

const classController = new ClassController();

classesRouter.get('/', classController.index);
classesRouter.get('/:id', classController.show);
classesRouter.post('/', classController.store);
classesRouter.put('/:id', classController.update);
classesRouter.delete('/:id', classController.delete);

module.exports = classesRouter;