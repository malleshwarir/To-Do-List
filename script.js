document.getElementById('addButton').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'mr-2';
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            listItem.classList.add('completed');
            storeCompletedTask(taskText);
        } else {
            listItem.classList.remove('completed');
            removeCompletedTask(taskText);
        }
    });

    const textNode = document.createTextNode(taskText);
    listItem.appendChild(checkbox);
    listItem.appendChild(textNode);

    const removeButton = document.createElement('button');
    removeButton.className = 'btn-remove btn btn-link';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
        taskList.removeChild(listItem);
        removeCompletedTask(taskText);
    });

    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    taskInput.value = ""; // Clear the input field
}

function storeCompletedTask(task) {
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    if (!completedTasks.includes(task)) {
        completedTasks.push(task);
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
}

function removeCompletedTask(task) {
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    completedTasks = completedTasks.filter(t => t !== task);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}
