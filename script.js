function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  date = date[1] + " " + date[2] + " " + date[3];
  document.querySelector("#date").innerHTML = date;
}

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
  });

  function addTask() {
    var input = document.getElementById('task');
    var taskText = input.value.trim();
    if (taskText !== '') {
      var todoList = document.getElementById('todo-list');

      var todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
      todoItem.innerHTML = `
        <span>${taskText}</span>
        <button class="deletebtn" onclick="deleteTask(this.parentNode)"></button>
      `;

      todoItem.addEventListener('click', function() {
        this.classList.toggle('checked');
        saveTasks();
      });

      todoList.appendChild(todoItem);
      saveTasks();
      input.value = '';
    }
  }

  function deleteTask(task) {
    var todoList = document.getElementById('todo-list');
    todoList.removeChild(task);
    saveTasks();
  }

  function saveTasks() {
    var todoList = document.getElementById('todo-list');
    var tasks = [];

    todoList.querySelectorAll('.todo-item').forEach(function(item) {
      tasks.push({
        text: item.querySelector('span').innerText,
        completed: item.classList.contains('checked')
      });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    var todoList = document.getElementById('todo-list');
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function(task) {
      var todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
      todoItem.innerHTML = `
        <span>${task.text}</span>
        <button class="deletebtn" onclick="deleteTask(this.parentNode)"></button>
      `;

      if (task.completed) {
        todoItem.classList.add('checked');
      }

      todoItem.addEventListener('click', function() {
        this.classList.toggle('checked');
        saveTasks();
      });

      todoList.appendChild(todoItem);
    });
  }

  function clearTasks() {
    var todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    localStorage.removeItem('tasks');
  }

function resetAll() {
    clearTasks();
    displayDate();
}

  window.onload = function () {
    displayDate();
  };