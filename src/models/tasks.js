const db = require('./db/tasks')

module.exports = {
  addTask: db.addTask,
  updateTask: db.editTaskById,
  deleteTask: db.deleteTaskById,
  getTask: db.getTaskByTaskId,
  getAllTasks: db.getAllTasks,
  getTaskStatus: db.getTaskStatusByTaskId,
  toggleTask: db.toggleTask,
}