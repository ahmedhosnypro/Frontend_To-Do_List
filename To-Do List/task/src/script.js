let inputTaskField = document.getElementById("input-task");
let tasksList = document.getElementById("task-list");

document.getElementById("add-task-button").addEventListener("click", function () {
    let inputTaskName = inputTaskField.value;
    if (inputTaskName === "") {
        return;
    }
    
    inputTaskField.value = "";

    let newTask = document.createElement("li");
    tasksList.appendChild(newTask);

    let taskCheckBox = document.createElement("input");
    taskCheckBox.type = "checkbox";

    let taskName = document.createElement("span");
    taskName.className = "task";
    taskName.textContent = inputTaskName;

    let taskDeleteButton = document.createElement("button");
    taskDeleteButton.className = "delete-btn";
    taskDeleteButton.innerHTML = `<img src="x.webp" alt="delete task">`;
    taskDeleteButton.addEventListener("click", function () {
        tasksList.removeChild(taskDeleteButton.parentNode);
    })

    newTask.appendChild(taskCheckBox);
    newTask.appendChild(taskName);
    newTask.appendChild(taskDeleteButton);
});