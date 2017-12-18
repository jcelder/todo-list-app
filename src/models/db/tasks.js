const db = require('./connection')
const query = require('./tasksQueries')

/**
 * Adds a task
 * @param {Object} task
 * @returns {Promise} Promise object resolves to the task_id
 */
const addTask = task => db.one(query.addTask, [task.content, task.time])

/**
 * Checks complete status of a task by task id
 * @param {number} taskId
 * @returns {Promise} Promise object resolves to the task_complete status
 */
const getTaskStatusByTaskId = taskId => db.one(query.getTaskStatus, taskId)

/**
 * Checks current status of a task and then toggles it to either true or false
 * @param {Object} task
 */
const toggleTask = (task) => {
  return getTaskStatusByTaskId(task.taskId)
    .then((taskStatus) => {
      if (task.displayedStatus === taskStatus[0]) {
        task.displayedStatus = !task.displayedStatus
        return db.one(query.toggleTask, [task.displayedStatus, task.taskId])
      }
      // Error Goes Here
    })
}

module.exports = {
  addTask,
  getTaskStatusByTaskId,
  toggleTask,
}
