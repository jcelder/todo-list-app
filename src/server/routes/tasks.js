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
  })

router.route('/tasks/:task_id')
  .put((req, res) => {

  })
  .delete((req, res) => {
    
  })

module.exports = router