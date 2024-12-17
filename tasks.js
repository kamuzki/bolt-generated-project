document.addEventListener('DOMContentLoaded', () => {
      const tasksContainer = document.getElementById('tasks-container');
      const addTaskButton = document.getElementById('add-task-button');
    
      let tasks = loadTasks();
      renderTasks();
    
      addTaskButton.addEventListener('click', () => {
        const newTask = {
          id: Date.now(),
          projectId: null, // Hier könnte eine Auswahl des Projekts stehen
          title: '',
          dueDate: null,
          status: 'Offen',
          priority: 'Mittel',
          description: '',
          assignedTo: null // Hier könnte eine Auswahl des Benutzers stehen
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
      });
    
      function renderTasks() {
        tasksContainer.innerHTML = '';
        tasks.forEach(task => {
          const taskElement = document.createElement('div');
          taskElement.classList.add('task');
          taskElement.id = `task-${task.id}`;
          taskElement.innerHTML = `
            <h3>${task.title || 'Neue Aufgabe'}</h3>
            <p>Projekt: ${task.projectId || 'Nicht zugewiesen'}</p>
            <p>Fällig am: ${task.dueDate || 'Kein Datum'}</p>
            <p>Status: ${task.status}</p>
            <p>Priorität: ${task.priority}</p>
            <p>Beschreibung: ${task.description || 'Keine Beschreibung'}</p>
            <p>Zugewiesen an: ${task.assignedTo || 'Nicht zugewiesen'}</p>
            <button class="edit-task-button" data-task-id="${task.id}">Bearbeiten</button>
            <button class="delete-task-button" data-task-id="${task.id}">Löschen</button>
          `;
          tasksContainer.appendChild(taskElement);
    
          const editButton = taskElement.querySelector('.edit-task-button');
          editButton.addEventListener('click', () => {
            // Hier könnte eine Funktion zum Bearbeiten der Aufgabe aufgerufen werden
            console.log('Aufgabe bearbeiten:', task.id);
          });
    
          const deleteButton = taskElement.querySelector('.delete-task-button');
          deleteButton.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
          });
        });
      }
    
      function loadTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
      }
    
      function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    });
