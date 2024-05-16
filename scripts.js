var input= document.getElementById('input');
var list= document.getElementById('list');

window.onload = function(){
    if(localStorage.getItem("task") != null){
        list.innerHTML = localStorage.getItem("task");
    }
}

function Add(){
    if(input.value != ""){
        
        task.innerHTML +=
        `
        <div class="task" draggable="true">
        <input id="text" value=${input.value} disabled> 
        <div>
        <button onclick="Edit(this.parentNode)" style="background-image:url(https://cdn-icons-png.flaticon.com/128/4277/4277132.png)"></button>
        <button onclick="Del(this.parentNode)" style="background-image:url(https://cdn-icons-png.flaticon.com/128/2984/2984959.png)"></button>
        <button onclick="Done(this.parentNode)" style="background-image:url(https://cdn-icons-png.flaticon.com/128/447/447147.png)"></button> 
        </div>
        </div>`;
        list.appendChild(task);
    }
    input.value = "";
    localStorage.setItem("task", list.innerHTML);

    

}

function Reset(){
    list.innerHTML = "";
    localStorage.removeItem("task");
}

function Del(task){
    task.parentNode.remove();
    localStorage.setItem("task", list.innerHTML);
}

function Done(task){
    parent=task.parentNode;
    if(parent.firstElementChild.style.textDecoration == "line-through"){
        parent.firstElementChild.style.textDecoration = "none";
        parent.firstElementChild.style.color = "black";
    }
    else
    {
    parent.firstElementChild.style.textDecoration = "line-through";
    parent.firstElementChild.style.color = "#4b4b4b";
    }
    localStorage.setItem("task", list.innerHTML);
}

function Edit(task){

    if(task.parentNode.firstElementChild.disabled == false)
    {
        task.parentNode.firstElementChild.disabled = true;
    }
    else
    {
        task.parentNode.firstElementChild.disabled = false;
    }
    localStorage.setItem("task", list.innerHTML);
    
}