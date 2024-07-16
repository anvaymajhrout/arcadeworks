document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    const addTask = (taskText) => {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        saveTask(taskText, new Date().toLocaleString());
    };

    const createTaskElement = (taskText) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskItem.appendChild(taskContent);

        const taskTime = document.createElement('span');
        taskTime.className = 'task-time';
        taskTime.textContent = new Date().toLocaleString();
        taskItem.appendChild(taskTime);

        const taskCompleteBtn = document.createElement('button');
        taskCompleteBtn.innerHTML = '&#10003;';
        taskCompleteBtn.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });
        taskItem.appendChild(taskCompleteBtn);

        return taskItem;
    };

    const saveTask = (taskText, timestamp) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, time: timestamp });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => {
            const taskItem = createTaskElement(task.text);
            taskItem.querySelector('.task-time').textContent = task.time;
            taskList.appendChild(taskItem);
        });
    };

    loadTasks();
});
