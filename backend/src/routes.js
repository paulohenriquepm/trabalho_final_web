const Router = require('express');

const classesRouter = require('./modules/classes/routes/classes.routes');
const studentsRouter = require('./modules/students/routes/students.routes');

const routes = Router();

routes.use('/classes', classesRouter);

routes.use('/students', studentsRouter);

module.exports = routes;