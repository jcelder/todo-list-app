const db = require('./connection')
const query = require('./tasksQueries')

/**
 * Adds a task
 * @param {Object} task
 * @returns {Promise} Promise object resolves to the task_id
 */
const addTask = task => db.one(query.addTask, [task.content, task.time])

/**
 * Returns the task object with a matching task_id
 * @param {number} taskId
 * @returns {Promise} Promise object resolves to a task object
 */
const getTaskByTaskId = taskId => db.one(query.getTaskById, taskId)

/**
 * Gets all tasks
 * @returns {Promise} Promise object resolves to an array of task objects
 */
const getAllTasks = () => db.any(query.getAllTasks)

/**
 * Checks complete status of a task by task id
 * @param {number} taskId
 * @returns {Promise} Promise object resolves to an object containing task_complete status
 */
const getTaskStatusByTaskId = taskId => db.one(query.getTaskStatus, taskId)

/**
 * Checks current status of a task and then toggles it to either true or false
 * @param {Object} task
 */
const toggleTask = (task) => {
  return getTaskStatusByTaskId(task.taskId)
    .then((returnedObject) => {
      if (task.status === returnedObject.task_complete) {
        return db.one(query.toggleTask, [!task.status, task.taskId])
      }
      throw new Error('Database Mismatch Error')
    })
}

module.exports = {
  addTask,
  getTaskByTaskId,
  getAllTasks,
  getTaskStatusByTaskId,
  toggleTask,
}
