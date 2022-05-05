//Define routers for tasks
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.route('/api/tasks').get(taskController.getAllTasks).post(taskController.postTask);
router.route('/api/tasks/:id').get(taskController.getTaskById)
                                .patch(taskController.updateTask)
                                .delete(taskController.deleteTask);


module.exports = router;

