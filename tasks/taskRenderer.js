import { handleEditTask, handleDeleteTask, handleCompleteTask } from './taskActions.js';
    
    export function renderTasks(tasks, tasksContainer) {
      tasksContainer.innerHTML = '';
      tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.id = `task-${task.id}`;
        taskElement.innerHTML = `
          <div class="task-header">
            <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
            <h3 class="${task.completed ? 'completed' : ''}">${task.title || 'Neue Aufgabe'}</h3>
          </div>
          <p>Fällig am: ${task.dueDate || 'Kein Datum'}</p>
          <p>Status: ${task.status}</p>
          <p>Priorität: ${task.priority}</p>
          <p>Beschreibung: ${task.description || 'Keine Beschreibung'}</p>
          <div class="task-actions">
            <button class="edit-task-button" data-task-id="${task.id}">Bearbeiten</button>
            <button class="delete-task-button" data-task-id="${task.id}">Löschen</button>
          </div>
        `;
        tasksContainer.appendChild(taskElement);
    
        const checkbox = taskElement.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
          handleCompleteTask(task, tasksContainer, checkbox.checked);
        });
    
        const editButton = taskElement.querySelector('.edit-task-button');
        editButton.addEventListener('click', () => {
          handleEditTask(task, tasksContainer);
        });
    
        const deleteButton = taskElement.querySelector('.delete-task-button');
        deleteButton.addEventListener('click', () => {
          handleDeleteTask(task, tasksContainer);
        });
      });
    }
