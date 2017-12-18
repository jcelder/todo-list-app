
const addTask = `
INSERT INTO tasks
  (task_content, task_time)
VALUES
  ($1, $2)
RETURNING task_id
`

const getAllTasks = `
SELECT * FROM tasks
`

const getTaskStatus = `
SELECT task_complete
  FROM tasks
WHERE task_id = $1
`

const toggleTask = `
UPDATE tasks 
  SET task_complete = $1 
WHERE task_id = $2
`

module.exports = {
  addTask,
  getAllTasks,
  getTaskStatus,
  toggleTask,
}
