let input = document.getElementById("input");
let list = document.getElementById("list");
let task = document.querySelector(".body-container");

window.onload = function () {
  if (localStorage.getItem("task") != null) {
    list.innerHTML = localStorage.getItem("task");
    drag();
  }
};

function Add() {
  if (input.value != "") {
    task.innerHTML += `
        <div class="task draggable" draggable="true">
        <input id="text" value=${input.value} disabled> 
        <div>
        <button onclick="Edit(this.parentNode)" style="background-image:url(./assets/pencil.png)"></button>
        <button onclick="Del(this.parentNode)" style="background-image:url(./assets/delete.png)"></button>
        <button onclick="Done(this.parentNode)" style="background-image:url(./assets/tick.png)"></button> 
        </div>
        </div>`;
  }
  input.value = "";

  drag();
}

function Reset() {
  list.innerHTML = "";
  localStorage.removeItem("task");
}

function Del(task) {
  task.parentNode.remove();
  localStorage.setItem("task", list.innerHTML);
}

function Done(task) {
  parent = task.parentNode;
  if (parent.firstElementChild.style.textDecoration == "line-through") {
    parent.firstElementChild.style.textDecoration = "none";
    parent.firstElementChild.style.color = "black";
  } else {
    parent.firstElementChild.style.textDecoration = "line-through";
    parent.firstElementChild.style.color = "#4b4b4b";
  }
  localStorage.setItem("task", list.innerHTML);
}

function Edit(task) {
  if (task.parentNode.firstElementChild.disabled == false) {
    task.parentNode.firstElementChild.disabled = true;
  } else {
    task.parentNode.firstElementChild.disabled = false;
  }
  localStorage.setItem("task", list.innerHTML);
}

function drag() {
  const draggables = document.querySelectorAll(".draggable");
  const containers = document.querySelectorAll(".containerr");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      console.log(container);
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
      localStorage.removeItem("task");
      localStorage.setItem("task", list.innerHTML);
    });
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".draggable:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
