document.addEventListener('DOMContentLoaded', () => {
      const notesContainer = document.getElementById('notes-container');
      const addNoteButton = document.getElementById('add-note-button');
      const noteModal = document.getElementById('note-modal');
      const closeNoteModal = document.getElementById('close-note-modal');
      const notesListModal = document.getElementById('notes-modal');
      const closeNotesListModal = document.getElementById('close-notes-modal');
      const noteForm = document.getElementById('note-form');
      const noteContentInput = document.getElementById('note-content');
      const noteColorInput = document.getElementById('note-color');
    
      let notes = loadNotes();
      renderNotes();
    
      addNoteButton.addEventListener('click', () => {
        noteModal.style.display = 'block';
        document.body.classList.add('modal-open');
      });
    
      closeNoteModal.addEventListener('click', () => {
        noteModal.style.display = 'none';
        document.body.classList.remove('modal-open');
      });
    
      closeNotesListModal.addEventListener('click', () => {
        notesListModal.style.display = 'none';
        document.body.classList.remove('modal-open');
      });
    
      noteForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const newNote = {
          id: Date.now(),
          content: noteContentInput.value,
          color: noteColorInput.value,
          position: { x: 50, y: 50 },
          size: { width: 200, height: 200 }
        };
    
        notes.push(newNote);
        saveNotes();
        renderNotes();
    
        noteContentInput.value = '';
        noteColorInput.value = '#ffffcc';
        noteModal.style.display = 'none';
        document.body.classList.remove('modal-open');
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
          noteElement.style.width = `${note.size.width}px`;
          noteElement.style.height = `${note.size.height}px`;
          noteElement.innerHTML = `
            <div class="note-header">
              <span class="delete-icon" data-note-id="${note.id}">❌</span>
            </div>
            <div class="note-content">${note.content}</div>
          `;
          notesContainer.appendChild(noteElement);
    
          const deleteIcon = noteElement.querySelector('.delete-icon');
          deleteIcon.addEventListener('click', () => {
            notes = notes.filter(n => n.id !== note.id);
            saveNotes();
            renderNotes();
          });
    
          makeNoteDraggable(noteElement, note);
          makeNoteResizable(noteElement, note);
        });
      }
    
      function makeNoteDraggable(noteElement, note) {
        let isDragging = false;
        let startPosX, startPosY;
    
        noteElement.addEventListener('mousedown', (e) => {
          if (e.target.classList.contains('note-header') || e.target.tagName === 'SPAN') {
            isDragging = true;
            startPosX = e.clientX - noteElement.offsetLeft;
            startPosY = e.clientY - noteElement.offsetTop;
            noteElement.style.zIndex = 1000;
          }
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
    
      function makeNoteResizable(noteElement, note) {
        let isResizing = false;
        let startWidth, startHeight, startPosX, startPosY;
    
        const resizer = document.createElement('div');
        resizer.classList.add('resizer');
        noteElement.appendChild(resizer);
    
        resizer.addEventListener('mousedown', (e) => {
          isResizing = true;
          startWidth = noteElement.offsetWidth;
          startHeight = noteElement.offsetHeight;
          startPosX = e.clientX;
          startPosY = e.clientY;
          e.stopPropagation();
        });
    
        document.addEventListener('mousemove', (e) => {
          if (!isResizing) return;
    
          const width = startWidth + (e.clientX - startPosX);
          const height = startHeight + (e.clientY - startPosY);
    
          noteElement.style.width = `${width}px`;
          noteElement.style.height = `${height}px`;
    
          note.size = { width, height };
        });
    
        document.addEventListener('mouseup', () => {
          isResizing = false;
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
