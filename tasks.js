document.addEventListener('DOMContentLoaded', () => {
      const tasksContainer = document.getElementById('tasks-container');
      const addTaskButton = document.getElementById('add-task-button');
      let tasks = loadTasks();
      renderTasks();
    
      addTaskButton.addEventListener('click', () => {
        openTaskModal();
      });
    
      function openTaskModal(task = null) {
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
    
          if (task) {
            task.title = title;
            task.dueDate = dueDate;
            task.status = status;
            task.priority = priority;
            task.description = description;
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
          renderTasks();
          modal.remove();
        });
      }
    
      function renderTasks() {
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
            task.completed = checkbox.checked;
            saveTasks(tasks);
            renderTasks();
          });
    
          const editButton = taskElement.querySelector('.edit-task-button');
          editButton.addEventListener('click', () => {
            openTaskModal(task);
          });
    
          const deleteButton = taskElement.querySelector('.delete-task-button');
          deleteButton.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks(tasks);
            renderTasks();
          });
        });
      }
    
      function loadTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
      }
    
      function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    });
