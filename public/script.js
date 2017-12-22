/* eslint-env browser, jquery */

// DOM Manipulation

const createListItem = (taskId, task) => {
  // Create new list item
  const newListItem = document.createElement('li')
  newListItem.setAttribute('class', 'mdc-list-item mdc-elevation--z4 task-item')
  newListItem.setAttribute('data-internal-id', taskId)

  // Create new switch element
  const newSwitchDiv = document.createElement('div')
  const newSwitchInput = document.createElement('input')
  const newSwitchBg = document.createElement('div')
  const newSwitchKnob = document.createElement('div')
  newSwitchDiv.setAttribute('class', 'mdc-switch list-switch')
  newSwitchInput.setAttribute('class', 'mdc-switch__native-control')
  newSwitchInput.setAttribute('type', 'checkbox')
  newSwitchBg.setAttribute('class', 'mdc-switch__background')
  newSwitchKnob.setAttribute('class', 'mdc-switch__knob')

  // Append switch nodes to newSwitchDiv
  newSwitchBg.appendChild(newSwitchKnob)
  newSwitchDiv.appendChild(newSwitchInput)
  newSwitchDiv.appendChild(newSwitchBg)

  // Create content spans
  const newListContentSpan = document.createElement('span')
  const newListTimeSpan = document.createElement('span')
  newListContentSpan.setAttribute('class', 'list-content')
  newListTimeSpan.setAttribute('class', 'list-time')
  newListContentSpan.innerHTML = task.content
  newListTimeSpan.innerHTML = task.time

  // Create button span
  const newListButtonSpan = document.createElement('span')
  const newEditButton = document.createElement('button')
  const newDeleteButton = document.createElement('button')
  newListButtonSpan.setAttribute('class', 'list-btn-container')
  newEditButton.setAttribute('class', 'mdc-button mdc-button--raised edit-task-btn')
  newEditButton.innerHTML = 'Edit'
  newDeleteButton.setAttribute('class', 'mdc-button mdc-button--raised delete-task-btn')
  newDeleteButton.innerHTML = 'Delete'
  newListButtonSpan.appendChild(newEditButton)
  newListButtonSpan.appendChild(newDeleteButton)

  // Append nodes to new list item
  newListItem.appendChild(newSwitchDiv)
  newListItem.appendChild(newListContentSpan)
  newListItem.appendChild(newListTimeSpan)
  newListItem.appendChild(newListButtonSpan)

  // Append new list item to the current list
  const currentList = document.getElementById('task-list')
  currentList.appendChild(newListItem)
}

const clearAddModal = () => {
  document.getElementById('new-task-content').value = ''
  document.getElementById('new-task-time').value = ''
}

// Fetch Requests
const addTaskFetch = (task) => {
  console.log(task)
  return fetch('http://localhost:3000/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((taskId) => {
      console.log(taskId)
      return taskId
    })
}

const editTaskFetch = (task) => {
  return fetch(`http://localhost:3000/tasks/${task.task_id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.text())
}

const deleteTaskFetch = (taskId) => {
  return fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: 'DELETE',
  })
    .then((res) => {
      return res.text()
    })
    .then((data) => {
      console.log(data)
    })
}
// Form Controls
$('input[type="checkbox"]').on('click', function() {
  $(this).parents('li').find('.list-content, .list-time').toggleClass('completed') 
})


// Modal Event Handling
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
  const task = {
    content: document.getElementById('new-task-content').value,
    time: document.getElementById('new-task-time').value,
  }
  return addTaskFetch(task)
    .then((taskId) => {
      createListItem(taskId, task)
      clearAddModal()
      addTaskModal.style.display = 'none'
    })
})

// delete-task-modal
const deleteTaskModal = document.getElementById('delete-task-modal')

const deleteTaskModalCloseBtn = document.getElementById('delete-task-modal-close-btn')

window.addEventListener('click', (btn) => {
  if (/delete-task-btn/.test(btn.target.className)) {
    const deleteTaskConfirmBtn = document.getElementById('delete-task-modal-confirm-btn')
    const taskList = document.getElementById('task-list')
    deleteTaskModal.style.display = 'block'
    deleteTaskConfirmBtn.addEventListener('click', () => {
      const selectedListItem = btn.target.parentNode.parentNode
      const taskId = selectedListItem.getAttribute('data-internal-id')
      return deleteTaskFetch(taskId)
        .then(() => {
          taskList.removeChild(selectedListItem)
          deleteTaskModal.style.display = 'none'
        })
    })
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



// edit-task-modal
const editTaskModal = document.getElementById('edit-task-modal')
const editTaskSubmitBtn = document.getElementById('edit-task-modal-submit-btn')
const editTaskModalCloseBtn = document.getElementById('edit-task-modal-close-btn')

window.addEventListener('click', (btn) => {
  if (/edit-task-btn/.test(btn.target.className)) {
    editTaskModal.style.display = 'block'
    const currentTask = btn.target.parentNode.parentNode
    const currentTaskContent = currentTask.childNodes[1].innerHTML
    const currentTaskTime = currentTask.childNodes[2].innerHTML
    const editedTaskContent = document.getElementById('edit-task-content')
    const editedTaskTime = document.getElementById('edit-task-time')
    editedTaskContent.setAttribute('data-internal-id', currentTask.getAttribute('data-internal-id'),)
    editedTaskContent.value = currentTaskContent
    editedTaskTime.value = currentTaskTime
  }
})

editTaskSubmitBtn.addEventListener('click', () => {
  const editContentField = document.getElementById('edit-task-content')
  const editTimeField = document.getElementById('edit-task-time')
  const taskId = editContentField.getAttribute('data-internal-id')
  const task = {
    task_id: taskId,
    task_content: editContentField.value,
    task_time: editTimeField.value,
  }
  return editTaskFetch(task)
    .then((data) => {
      const displayedTask = $(`li[data-internal-id="${taskId}"]`)
      displayedTask.find('.list-content').text(task.task_content)
      displayedTask.find('.list-time').text(task.task_time)
      console.log(data)
      editTaskModal.style.display = 'none'
    })
})

editTaskModalCloseBtn.addEventListener('click', () => {
  editTaskModal.style.display = 'none'
})

window.addEventListener('click', () => {
  if (event.target === editTaskModal) {
    editTaskModal.style.display = 'none'
  }
})
