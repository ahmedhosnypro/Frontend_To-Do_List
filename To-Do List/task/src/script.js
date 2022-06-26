let inputTaskField = document.getElementById("input-task");
let tasksList = document.getElementById("task-list");


document.getElementById("add-task-button").addEventListener("click", function () {
    let inputTaskName = inputTaskField.value;
    if (inputTaskName === "") {
        return;
    }
    inputTaskField.value = "";

    addNewTask(inputTaskName, false);
});


function toggleTask(checkBox) {
    if (checkBox.checked) {
        checkBox.nextElementSibling.classList.add("done-task");
    } else {
        checkBox.nextElementSibling.classList.remove("done-task");
    }
}

function creatTaskObject(task) {
    let allChildren = task.children;
    let name;
    let isDone;
    for (const element of allChildren) {
        if (element.classList.contains("task")) {
            name = element.textContent;
        }
        if (element.classList.contains("task-checkbox")) {
            isDone = element.checked;
        }
    }
    return {
        isDone: isDone,
        name: name
    }
}

function saveTasks() {
    debugger;
    let tasks = tasksList.children;
    let tasksArray = new Array(tasks.length);

    for (let i = 0; i < tasks.length; i++) {
        tasksArray[i] = creatTaskObject(tasks[i]);
    }

    localStorage.setItem("tasks", JSON.stringify(tasksArray))
    let a = 0;
}

document.addEventListener('DOMContentLoaded', function () {
    debugger;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (tasks === []) {
        return;
    }
    tasks.forEach((task) => {
        addNewTask(task.name, task.isDone);
    })
}, false);

function addNewTask(name, isDone) {
    let newTask = document.createElement("li");
    tasksList.appendChild(newTask);

    let taskCheckBox = document.createElement("input");
    taskCheckBox.type = "checkbox";
    taskCheckBox.checked = isDone;
    taskCheckBox.addEventListener("change", e => {
        toggleTask(taskCheckBox);
        saveTasks();
    });

    let taskName = document.createElement("span");
    taskName.className = "task";
    taskName.textContent = name;

    let taskDeleteButton = document.createElement("button");
    taskDeleteButton.className = "delete-btn";
    taskDeleteButton.innerHTML = `<img src="x.webp" alt="delete task">`;
    taskDeleteButton.addEventListener("click", function () {
        tasksList.removeChild(taskDeleteButton.parentNode);
        saveTasks();
    })

    newTask.appendChild(taskCheckBox);
    newTask.appendChild(taskName);
    newTask.appendChild(taskDeleteButton);
    saveTasks();
}