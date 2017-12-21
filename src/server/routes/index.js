const router = require('express').Router()
const tasks = require('../../models/tasks')
const tasksRoutes = require('./tasks')

router.get('/', (req, res) => {
  res.redirect('/tasks')
})

router.use('/', tasksRoutes)

module.exports = router
