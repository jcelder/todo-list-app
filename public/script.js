/* eslint-env noda, browser */

// add-task-modal
const addTaskModal = document.getElementById('add-task-modal')
const addTaskSubmitBtn = document.getElementById('add-task-modal-submit-btn')
const addTaskModalLaunch = document.getElementById('btn-add-task')
const addTaskModalCloseBtn = document.getElementById('add-task-modal-close-btn')

addTaskModalLaunch.addEventListener('click', () => {
  addTaskModal.style.display = 'block'
})

addTaskModalCloseBtn.addEventListener('click', () => {
  addTaskModal.style.display = 'none'
})

window.addEventListener('click', () => {
  if (event.target === addTaskModal) {
    addTaskModal.style.display = 'none'
  }
})

addTaskSubmitBtn.addEventListener('click', () => {
  console.log('Add this task')
})

// delete-task-modal
const deleteTaskModal = document.getElementById('delete-task-modal')
const deleteTaskConfirmBtn = document.getElementById('delete-task-modal-confirm-btn')
const deleteTaskModalLaunch = document.getElementsByClassName('delete-task-btn')
const deleteTaskModalCloseBtn = document.getElementById('delete-task-modal-close-btn')

window.addEventListener('click', (btn) => {
  if (/delete-task-btn/.test(btn.target.className)) {
    deleteTaskModal.style.display = 'block'
  }
})

deleteTaskModalCloseBtn.addEventListener('click', () => {
  deleteTaskModal.style.display = 'none'
})

window.addEventListener('click', () => {
  if (event.target === deleteTaskModal) {
    deleteTaskModal.style.display = 'none'
  }
})

deleteTaskConfirmBtn.addEventListener('click', () => {
  console.log('Delete this task')
})

// edit-task-modal
const editTaskModal = document.getElementById('edit-task-modal')
const editTaskSubmitBtn = document.getElementById('edit-task-modal-submit-btn')
const editTaskModalLaunch = document.getElementsByClassName('edit-task-btn')
const editTaskModalCloseBtn = document.getElementById('edit-task-modal-close-btn')

window.addEventListener('click', (btn) => {
  if(/edit-task-btn/.test(btn.target.className)) {
    editTaskModal.style.display = 'block'
  }
})

editTaskModalCloseBtn.addEventListener('click', () => {
  editTaskModal.style.display = 'none'
})

window.addEventListener('click', () => {
  if (event.target === editTaskModal) {
    editTaskModal.style.display = 'none'
  }
})
