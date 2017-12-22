const router = require('express').Router()
const tasks = require('../../models/tasks')

router.route('/tasks')
  .get((req, res) => {
    return tasks.getAllTasks()
      .then((tasksArray) => {
        res.render('tasks.pug', { tasksArray })
      })
  })
  .post((req, res) => {
    const task = req.body
    return tasks.addTask(task)
      .then((taskId) => {
        res.send(taskId)
      })
  })

router.route('/tasks/:task_id')
  .put((req, res) => {
    const task = req.body
    return tasks.updateTask(task)
      .then(() => {
        res.send('Task Edited')
      })
  })
  .delete((req, res) => {
    const taskId = req.params.task_id
    tasks.deleteTask(taskId)
      .then(() => {
        res.send('Task deleted')
      })
  })

module.exports = router
