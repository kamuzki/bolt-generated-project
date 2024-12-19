import { loadTasks, saveTasks } from './taskStorage.js';
    import { renderTasks } from './taskRenderer.js';
    
    export function openTaskModal(task = null, tasksContainer) {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-button">&times;</span>
          <h2>${task ? 'Aufgabe bearbeiten' : 'Neue Aufgabe'}</h2>
          <form id="task-form">
            <label for="task-title">Titel:</label>
            <input type="text" id="task-title" name="task-title" value="${task ? task.title : ''}" required>
            <label for="task-dueDate">Fälligkeitsdatum:</label>
            <input type="date" id="task-dueDate" name="task-dueDate" value="${task ? task.dueDate : ''}">
            <label for="task-status">Status:</label>
            <select id="task-status" name="task-status">
              <option value="Offen" ${task && task.status === 'Offen' ? 'selected' : ''}>Offen</option>
              <option value="In Bearbeitung" ${task && task.status === 'In Bearbeitung' ? 'selected' : ''}>In Bearbeitung</option>
              <option value="Erledigt" ${task && task.status === 'Erledigt' ? 'selected' : ''}>Erledigt</option>
            </select>
            <label for="task-priority">Priorität:</label>
            <select id="task-priority" name="task-priority">
              <option value="Niedrig" ${task && task.priority === 'Niedrig' ? 'selected' : ''}>Niedrig</option>
              <option value="Mittel" ${task && task.priority === 'Mittel' ? 'selected' : ''}>Mittel</option>
              <option value="Hoch" ${task && task.priority === 'Hoch' ? 'selected' : ''}>Hoch</option>
            </select>
            <label for="task-description">Beschreibung:</label>
            <textarea id="task-description" name="task-description">${task ? task.description : ''}</textarea>
            <button type="submit">${task ? 'Speichern' : 'Hinzufügen'}</button>
            <button type="button" class="cancel-button">Abbrechen</button>
          </form>
        </div>
      `;
      document.body.appendChild(modal);
    
      const closeButton = modal.querySelector('.close-button');
      closeButton.addEventListener('click', () => {
        modal.remove();
      });
    
      const cancelButton = modal.querySelector('.cancel-button');
      cancelButton.addEventListener('click', () => {
        modal.remove();
      });
    
      const form = modal.querySelector('#task-form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('task-title').value;
        const dueDate = document.getElementById('task-dueDate').value;
        const status = document.getElementById('task-status').value;
        const priority = document.getElementById('task-priority').value;
        const description = document.getElementById('task-description').value;
    
        let tasks = loadTasks();
        if (task) {
          task.title = title;
          task.dueDate = dueDate;
          task.status = status;
          task.priority = priority;
          task.description = description;
          const taskIndex = tasks.findIndex(t => t.id === task.id);
          if (taskIndex !== -1) {
            tasks[taskIndex] = task;
          }
        } else {
          const newTask = {
            id: Date.now(),
            title: title,
            dueDate: dueDate,
            status: status,
            priority: priority,
            description: description,
            completed: false
          };
          tasks.push(newTask);
        }
        saveTasks(tasks);
        renderTasks(tasks, tasksContainer);
        modal.remove();
      });
    }
