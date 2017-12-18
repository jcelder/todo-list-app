const db = require('../../../src/models/db/connection')

const truncateTasksQuery = 'TRUNCATE TABLE tasks RESTART IDENTITY'
const seedTasksQuery = `
INSERT INTO tasks 
  (task_content, task_time, task_complete)
VALUES
  ('Test Task, Please Ignore', '11:30', false),
  ('Please Ignore This Task', '14:15', true),
  ('Secret Task, Do Not Share', '09:45', false)
`
// Truncate 'tasks' table and restart identity
const truncateTasks = () => db.none(truncateTasksQuery)
// Seed 'tasks' table with testable data
const seedTasks = () => db.none(seedTasksQuery)
// Reset the 'tasks' table in the database
const resetTasks = () => truncateTasks.then(() => seedTasks())

module.exports = { resetTasks }
