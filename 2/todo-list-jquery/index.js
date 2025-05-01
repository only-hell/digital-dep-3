const tasks = [];

function addTask() {
  const newTask = $('#new-task').val();
  if (newTask.trim() !== '') {
    tasks.push({ text: newTask, completed: false });
    const listItem = $('<li class="todo-item"></li>');
    const taskText = $('<span></span>').text(newTask);
    const deleteButton = $('<button class="delete-btn">❌</button>');
    const renameButton = $('<button class="rename-btn">✏</button>');
    
    $(listItem).append(taskText, deleteButton, renameButton);

    // Обработчик на выполнение задачи
    $(listItem).on('click', function () {
      const index = $(this).index();
      tasks[index].completed = !tasks[index].completed;
      $(this).toggleClass('completed');
    });

    // Обработчик для удаления задачи
    deleteButton.on('click', function (e) {
      e.stopPropagation(); // Останавливаем всплытие события
      const index = $(this).parent().index();
      tasks.splice(index, 1);  // Удаляем задачу из массива
      $(this).parent().remove();  // Удаляем задачу из DOM
    });

    // Обработчик для переименования задачи
    renameButton.on('click', function (e) {
      e.stopPropagation(); // Останавливаем всплытие события
      const index = $(this).parent().index();
      const newName = prompt("Введите новое название задачи:", tasks[index].text);
      if (newName) {
        tasks[index].text = newName;
        $(this).siblings('span').text(newName);
      }
    });

    $('#todo-list').append(listItem);
    $('#new-task').val('');
  }
}

$('form').on('submit', function (e) {
  e.preventDefault();
  addTask();
});
