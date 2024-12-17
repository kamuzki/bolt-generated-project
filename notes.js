document.addEventListener('DOMContentLoaded', () => {
      const notesContainer = document.getElementById('notes-container');
      const addNoteButton = document.getElementById('add-note-button');
    
      let notes = loadNotes();
      renderNotes();
    
      addNoteButton.addEventListener('click', () => {
        const newNote = {
          id: Date.now(),
          content: '',
          color: '#ffffcc', // Standardfarbe für neue Notizen
          position: { x: 0, y: 0 } // Standardposition
        };
        notes.push(newNote);
        saveNotes();
        renderNotes();
      });
    
      function renderNotes() {
        notesContainer.innerHTML = '';
        notes.forEach(note => {
          const noteElement = document.createElement('div');
          noteElement.classList.add('note');
          noteElement.id = `note-${note.id}`;
          noteElement.style.backgroundColor = note.color;
          noteElement.style.left = `${note.position.x}px`;
          noteElement.style.top = `${note.position.y}px`;
          noteElement.innerHTML = `
            <textarea>${note.content}</textarea>
            <div class="note-actions">
              <span class="edit-icon" data-note-id="${note.id}">✏️</span>
              <span class="delete-icon" data-note-id="${note.id}">❌</span>
            </div>
          `;
          notesContainer.appendChild(noteElement);
    
          const textarea = noteElement.querySelector('textarea');
          textarea.addEventListener('input', () => {
            note.content = textarea.value;
            saveNotes();
          });
    
          const editIcon = noteElement.querySelector('.edit-icon');
          editIcon.addEventListener('click', () => {
            textarea.disabled = !textarea.disabled;
            textarea.focus();
          });
    
          const deleteIcon = noteElement.querySelector('.delete-icon');
          deleteIcon.addEventListener('click', () => {
            notes = notes.filter(n => n.id !== note.id);
            saveNotes();
            renderNotes();
          });
    
          makeNoteDraggable(noteElement, note);
        });
      }
    
      function makeNoteDraggable(noteElement, note) {
        let isDragging = false;
        let startPosX, startPosY;
    
        noteElement.addEventListener('mousedown', (e) => {
          isDragging = true;
          startPosX = e.clientX - noteElement.offsetLeft;
          startPosY = e.clientY - noteElement.offsetTop;
          noteElement.style.zIndex = 1000;
        });
    
        document.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
    
          const x = e.clientX - startPosX;
          const y = e.clientY - startPosY;
    
          noteElement.style.left = `${x}px`;
          noteElement.style.top = `${y}px`;
    
          note.position = { x, y };
        });
    
        document.addEventListener('mouseup', () => {
          isDragging = false;
          noteElement.style.zIndex = 'auto';
          saveNotes();
        });
      }
    
      function loadNotes() {
        return JSON.parse(localStorage.getItem('notes') || '[]');
      }
    
      function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
      }
    });
