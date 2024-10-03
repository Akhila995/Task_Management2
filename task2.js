const userNameInput = document.getElementById("userName");
const welcomeMessage = document.getElementById("welcomeMessage");
const taskInput = document.getElementById("taskInput");
const taskStatus = document.getElementById("taskStatus");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingTaskList = document.getElementById("pendingTaskList");
const completedTaskList = document.getElementById("completedTaskList");
const progressBar = document.getElementById("progressBar");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");

let tasks = [];
userNameInput.addEventListener('input', function () {
    const name = userNameInput.value.trim();
    welcomeMessage.innerText = name ? `Welcome, ${name}!` : '';
});
addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    const status = taskStatus.value;
    
    if (taskText) {
        const newTask = {
            text: taskText,
            completed: status === "completed"
        };
        tasks.push(newTask);
        taskInput.value = "";
        displayTasks();
        updateProgress();
    } else {
        alert("Please enter a task.");
    }
});

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
    updateProgress();
}
function editTask(index) {
    const updatedTaskText = prompt("Edit your task:", tasks[index].text);
    if (updatedTaskText) {
        tasks[index].text = updatedTaskText;
        displayTasks();
        updateProgress();
    }
}
function displayTasks() {
    pendingTaskList.innerHTML = ""; 
    completedTaskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = `list-group-item ${task.completed ? "completed" : ""}`;
        listItem.innerText = task.text;
        listItem.addEventListener('click', function () {
            toggleTaskCompletion(index);
        });
        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-warning btn-sm float-right mr-2";
        editBtn.innerText = "Edit";
        editBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            editTask(index);
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm float-right";
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent toggle task completion
            tasks.splice(index, 1);
            displayTasks();
            updateProgress();
        });

        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        if (task.completed) {
            completedTaskList.appendChild(listItem);
        } else {
            pendingTaskList.appendChild(listItem);
        }
    });
}
function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    progressBar.style.width = `${progressPercentage}%`;
    progressBar.innerText = `${Math.round(progressPercentage)}%`;
    document.getElementById("pendingTaskCount").innerText = `Pending: ${totalTasks - completedTasks}`;
    document.getElementById("completedTaskCount").innerText = `Completed: ${completedTasks}`;
}
toggleThemeBtn.addEventListener('click', function () {
    document.body.classList.toggle("dark-mode");
    toggleThemeBtn.innerText = document.body.classList.contains("dark-mode") ? "Toggle Light Mode" : "Toggle Dark Mode";
});
