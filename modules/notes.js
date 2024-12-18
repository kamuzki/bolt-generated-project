export function initNotes() {
      const notesLink = document.getElementById('notes-link');
      const pageContent = document.getElementById('page-content');
      const addNoteButton = document.createElement('button');
      addNoteButton.id = 'add-note-button';
      addNoteButton.textContent = 'Neue Notiz hinzufügen';
      const notesContainer = document.createElement('div');
      notesContainer.id = 'notes-container';
      const noteModal = document.getElementById('note-modal');
      const closeNoteModal = document.getElementById('close-note-modal');
      const noteForm = document.getElementById('note-form');
      const noteContentInput = document.getElementById('note-content');
      const noteColorInput = document.getElementById('note-color');
    
      // Display the notes content in the main area when the "Notes" link is clicked
      notesLink.addEventListener('click', (e) => {
        e.preventDefault();
        pageContent.innerHTML = '';
        pageContent.appendChild(addNoteButton);
        pageContent.appendChild(notesContainer);
        renderNotes(loadNotes(), notesContainer);
      });
    
      // Open the new note modal when the "Add Note" button is clicked
      pageContent.addEventListener('click', (e) => {
        if (e.target.id === 'add-note-button') {
          noteModal.style.display = 'block';
          document.body.classList.add('modal-open');
        }
      });
    
      // Close the new note modal
      closeNoteModal.addEventListener('click', () => {
        noteModal.style.display = 'none';
        document.body.classList.remove('modal-open');
      });
    
      // Handle new note form submission
      noteForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const newNote = {
          id: Date.now(),
          content: noteContentInput.value,
          color: noteColorInput.value,
          position: { x: 50, y: 50 },
          size: { width: 200, height: 200 }
        };
    
        let notes = loadNotes();
        notes.push(newNote);
        saveNotes(notes);
        renderNotes(notes, notesContainer);
    
        noteContentInput.value = '';
        noteColorInput.value = '#ffffcc';
        noteModal.style.display = 'none';
        document.body.classList.remove('modal-open');
      });
    }
    
    function renderNotes(notes, notesContainer) {
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
          let notes = loadNotes();
          notes = notes.filter(n => n.id !== note.id);
          saveNotes(notes);
          renderNotes(notes, notesContainer);
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
        let notes = loadNotes();
        const noteIndex = notes.findIndex(n => n.id === note.id);
        if (noteIndex !== -1) {
          notes[noteIndex] = note;
          saveNotes(notes);
        }
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
        let notes = loadNotes();
        const noteIndex = notes.findIndex(n => n.id === note.id);
        if (noteIndex !== -1) {
          notes[noteIndex] = note;
          saveNotes(notes);
        }
      });
    }
    
    function loadNotes() {
      return JSON.parse(localStorage.getItem('notes') || '[]');
    }
    
    function saveNotes(notes) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
