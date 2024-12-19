import { openTaskModal } from './taskModal.js';
    import { loadTasks, saveTasks } from './taskStorage.js';
    import { renderTasks } from './taskRenderer.js';
    
    export function handleAddTask(tasksContainer) {
      openTaskModal(null, tasksContainer);
    }
    
    export function handleEditTask(task, tasksContainer) {
      openTaskModal(task, tasksContainer);
    }
    
    export function handleDeleteTask(task, tasksContainer) {
      let tasks = loadTasks();
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks(tasks);
      renderTasks(tasks, tasksContainer);
    }
    
    export function handleCompleteTask(task, tasksContainer, isCompleted) {
      task.completed = isCompleted;
      let tasks = loadTasks();
      const taskIndex = tasks.findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        tasks[taskIndex] = task;
      }
      saveTasks(tasks);
      renderTasks(tasks, tasksContainer);
    }
