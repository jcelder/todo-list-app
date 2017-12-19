/* eslint-env node, mocha */
const { expect } = require('chai')
const db = require('../../src/models/tasks')
const { resetTasks } = require('../helpers/db/tasks.db')

describe('Tasks DB Functions Integration Tests', () => {
  beforeEach(() => resetTasks())
  describe('getAllTasks()', () => {
    it('should return an array containing all task objects', () => {
      return db.getAllTasks()
        .then((tasksArray) => {
          expect(tasksArray).to.have.length(3)
        })
    })
    it('should have a matching task object at a specific position', () => {
      const taskObject = {
        task_id: 1,
        task_content: 'Test Task, Please Ignore',
        task_time: '11:30',
        task_complete: false,
      }
      return db.getAllTasks()
        .then((tasksArray) => {
          expect(tasksArray[0]).to.deep.equal(taskObject)
        })
    })
  })
  describe('getTask()', () => {
    it('should return a matching task object', () => {
      const taskId = 3
      const taskObject = {
        task_id: 3,
        task_content: 'Secret Task, Do Not Share',
        task_time: '09:45',
        task_complete: false,
      }
      return db.getTask(taskId)
        .then((task) => {
          expect(task).to.deep.equal(taskObject)
        })
    })
  })
  describe('addTask()', () => {
    const taskId = 4
    const newTask = {
      content: 'This is not a drill, this is a test task',
      time: '08:30',
    }
    beforeEach(() => db.addTask(newTask))
    it('should add a task to the "tasks" table', () => {
      return db.getTask(taskId)
        .then((task) => {
          expect(task.task_content).to.equal(newTask.content)
        })
    })
  })
  describe('getTaskStatus()', () => {
    const taskId = 2
    it('should return the task complete status', () => {
      return db.getTaskStatus(taskId)
        .then((task) => {
          expect(task.task_complete).to.equal(true)
        })
    })
  })
  describe('toggleTask()', () => {
    it('should toggle the task_complete field', () => {
      const task = {
        taskId: 1,
        status: false,
      }
      return db.toggleTask(task)
        .then((returnedTask) => {
          expect(returnedTask.task_complete).to.equal(true)
        })
    })
  })
})
