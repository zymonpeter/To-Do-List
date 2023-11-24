// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');

  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });
}

// Function to add a task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const task = taskInput.value.trim();

  if (task !== '') {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    taskInput.value = '';
  }
}

// Function to edit a task
function editTask(button) {
  const li = button.parentNode;
  const span = li.querySelector('span');
  const updatedTask = prompt('Edit task:', span.textContent);

  if (updatedTask !== null) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const currentTask = span.textContent;
    const index = tasks.indexOf(currentTask);

    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
    }
  }
}

// Function to delete a task
function deleteTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  loadTasks();
}

// Function to create a task element
function createTaskElement(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${task}</span>
    <button class="edit-button" onclick="editTask(this)">Edit</button>
    <button onclick="deleteTask('${task}')">Delete</button>
  `;
  li.classList.add('task-item');
  return li;
}
loadTasks();
