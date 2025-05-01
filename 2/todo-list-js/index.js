const tasks = [];

function addTask() {
  const newTask = document.getElementById('new-task').value;
  if (newTask.trim() !== '') {
    tasks.push({ task: newTask, completed: false });
    const taskIndex = tasks.length - 1;

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    const taskNameElement = document.createElement('span');
    taskNameElement.innerText = newTask;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerText = '❌';

    const renameButton = document.createElement('button');
    renameButton.className = 'rename-btn';
    renameButton.innerText = '✏';

    listItem.appendChild(taskNameElement);
    listItem.appendChild(deleteButton);
    listItem.appendChild(renameButton);

    // Обработчик на выполнение задачи
    listItem.addEventListener('click', function () {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      listItem.classList.toggle('completed');
    });

    // Обработчик для удаления задачи
    deleteButton.addEventListener('click', function (e) {
      e.stopPropagation(); // Останавливаем всплытие события
      tasks.splice(taskIndex, 1);  // Удаляем задачу из массива
      listItem.remove();  // Удаляем задачу из DOM
    });

    // Обработчик для переименования задачи
    renameButton.addEventListener('click', function (e) {
      e.stopPropagation(); // Останавливаем всплытие события
      const newName = prompt("Введите новое название задачи:", tasks[taskIndex].task);
      if (newName) {
        tasks[taskIndex].task = newName;
        taskNameElement.innerText = newName;
      }
    });

    document.getElementById('todo-list').appendChild(listItem);
    document.getElementById('new-task').value = '';
  }
}

document.getElementById('add-button').onclick = addTask;
