import { handleAddTask } from './tasks/taskActions.js';
    import { renderTasks } from './tasks/taskRenderer.js';
    import { loadTasks } from './tasks/taskStorage.js';
    import './tasks/taskComponent.css';
    
    document.addEventListener('DOMContentLoaded', () => {
      const tasksContainer = document.getElementById('tasks-container');
      const addTaskButton = document.getElementById('add-task-button');
      let tasks = loadTasks();
      renderTasks(tasks, tasksContainer);
    
      addTaskButton.addEventListener('click', () => {
        handleAddTask(tasksContainer);
      });
    });
