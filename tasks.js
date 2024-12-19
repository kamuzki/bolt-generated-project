import { handleAddTask } from './tasks/taskActions.js';
    import { renderTasks } from './tasks/taskRenderer.js';
    import { loadTasks } from './tasks/taskStorage.js';
    import './tasks/taskComponent.css';
    
    document.addEventListener('DOMContentLoaded', () => {
      const tasksLink = document.getElementById('tasks-link');
      const pageContent = document.getElementById('page-content');
      const originalHeader = document.querySelector('.header-title');
      const authButtons = document.getElementById('auth-buttons-container');
      const notesHeader = document.getElementById('notes-page-header');
      const addTaskButton = document.createElement('button');
      addTaskButton.id = 'add-task-button';
      addTaskButton.textContent = 'Neue Aufgabe hinzufügen';
      const tasksContainer = document.createElement('div');
      tasksContainer.id = 'tasks-container';
    
      tasksLink.addEventListener('click', (e) => {
        e.preventDefault();
        originalHeader.style.display = 'none';
        authButtons.style.display = 'none';
        notesHeader.style.display = 'block';
        pageContent.innerHTML = '';
    
        // Apply flexbox to center the button
        pageContent.style.display = 'flex';
        pageContent.style.flexDirection = 'column';
        pageContent.style.alignItems = 'center';
    
        pageContent.appendChild(notesHeader);
        pageContent.appendChild(addTaskButton);
        pageContent.appendChild(tasksContainer);
    
        let tasks = loadTasks();
        renderTasks(tasks, tasksContainer);
      });
    
      pageContent.addEventListener('click', (e) => {
        if (e.target.id === 'add-task-button') {
          handleAddTask(tasksContainer);
        }
      });
    });
