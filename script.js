const addTaskBtn = document.getElementById('addTaskBtn');
const tasksUl = document.getElementById('tasks');
const progressBar = document.getElementById('progressBar');
const filterCategory = document.getElementById('filterCategory');
const darkModeToggle = document.getElementById('darkModeToggle');

let tasks = [];

addTaskBtn.addEventListener('click', addTask);
filterCategory.addEventListener('change', displayTasks);
darkModeToggle.addEventListener('click', toggleDarkMode);

function addTask() {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const dueDate = document.getElementById('taskDueDate').value;
  const category = document.getElementById('taskCategory').value;

  if (!title) {
    alert('Task title is required!');
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    dueDate,
    category,
    completed: false,
  };

  tasks.push(newTask);
  displayTasks();
  clearForm();
}

function displayTasks() {
  tasksUl.innerHTML = '';

  const selectedCategory = filterCategory.value;

  const filteredTasks = tasks.filter(task => {
    return selectedCategory === 'All' || task.category === selectedCategory;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task';
    li.dataset.category = task.category;
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <strong>${task.title}</strong> (${task.category})<br>
      <small>Due: ${task.dueDate || "No due date"}</small><br>
      <p>${task.description}</p>
      <button onclick="toggleComplete(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
    `;

    tasksUl.appendChild(li);
  });

  updateProgress();
}

function toggleComplete(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  displayTasks();
}

function updateProgress() {
  if (tasks.length === 0) {
    progressBar.style.width = '0%';
    return;
  }
  const completedTasks = tasks.filter(task => task.completed).length;
  const percentage = (completedTasks / tasks.length) * 100;
  progressBar.style.width = `${percentage}%`;
}

function clearForm() {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
  document.getElementById('taskDueDate').value = '';
  document.getElementById('taskCategory').value = 'Math';
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}
