const db = require('./db/tasks')

module.exports = {
  addTask: db.addTask,
  getTask: db.getTaskByTaskId,
  getAllTasks: db.getAllTasks,
  getTaskStatus: db.getTaskStatusByTaskId,
  toggleTask: db.toggleTask,
}