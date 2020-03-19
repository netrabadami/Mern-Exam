const TaskController = require('../controllers/task.controller')

module.exports = (app) => {
    app.post("/api/task/create", TaskController.createTask);
    app.get("/api/task", TaskController.getAll);
    app.get('/api/task/:id', TaskController.getOne);
    app.put('/api/task/:id', TaskController.updateTask);
    app.delete('/api/task/:id', TaskController.deleteTask);
}