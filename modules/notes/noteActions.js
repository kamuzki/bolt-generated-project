import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { loadNotes, saveNotes } from './noteStorage.js';
import { makeNoteDraggable } from './noteDragging.js';
import { makeNoteResizable } from './noteResizing.js';

export function openNoteModal(noteId = null) {
  const noteModal = document.createElement('div');
  noteModal.classList.add('modal', 'edit-modal');
  noteModal.style.display = 'block';
  document.body.appendChild(noteModal);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  noteModal.appendChild(modalContent);

  // Add the close button to the modal
  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";
  closeButton.addEventListener("click", () => {
    noteModal.remove();
  });
  modalContent.appendChild(closeButton);

  const editorContainer = document.createElement('div');
  editorContainer.id = `edit-note-content-${noteId || 'new'}`;
  editorContainer.style.height = '200px';
  modalContent.appendChild(editorContainer);

  const tagsInput = document.createElement('input');
  tagsInput.setAttribute('type', 'text');
  tagsInput.setAttribute('placeholder', 'Tags (kommagetrennt)');
  tagsInput.id = `edit-note-tags-${noteId || 'new'}`;
  modalContent.appendChild(tagsInput);

  const saveButton = document.createElement('button');
  saveButton.classList.add('save-button');
  saveButton.textContent = 'Speichern';
  modalContent.appendChild(saveButton);

  const cancelButton = document.createElement('button');
  cancelButton.classList.add('cancel-button');
  cancelButton.textContent = 'Abbrechen';
  modalContent.appendChild(cancelButton);

  // Add event listener to the "cancel" button
  cancelButton.addEventListener('click', () => {
    noteModal.remove();
  });

  const editor = new Quill(`#edit-note-content-${noteId || 'new'}`, {
    theme: 'snow',
    placeholder: 'Schreibe deine Notiz...',
  });

  let note = null;
  if (noteId) {
    note = loadNotes().find(n => n.id === noteId);
    if (note) {
      editor.root.innerHTML = note.content;
      tagsInput.value = note.tags.join(', ');
    }
  }

  saveButton.addEventListener('click', () => {
    const updatedContent = editor.root.innerHTML;
    const updatedTags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    let notes = loadNotes();
    if (noteId) {
      const noteIndex = notes.findIndex((n) => n.id === noteId);
      if (noteIndex !== -1) {
        notes[noteIndex].content = updatedContent;
        notes[noteIndex].tags = updatedTags;
      }
    } else {
      const newNote = {
        id: Date.now(),
        content: updatedContent,
        color: "#ffffcc",
        position: getNextAvailablePosition(notes),
        size: { width: 200, height: 200 },
        tags: updatedTags
      };
      notes.push(newNote);
    }
    saveNotes(notes);
    renderNotes(notes, document.getElementById('notes-container'));
    noteModal.remove();
  });
}

export function deleteNote(noteId, notesContainer) {
  let notes = loadNotes();
  notes = notes.filter((n) => n.id !== noteId);
  saveNotes(notes);
  renderNotes(notes, notesContainer);
}

export function filterNotes(searchTerm) {
  const notes = loadNotes();
  if (!searchTerm) {
    return notes;
  }
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return notes.filter(note => {
    const contentMatch = note.content.toLowerCase().includes(lowerCaseSearchTerm);
    const tagMatch = note.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm));
    return contentMatch || tagMatch;
  });
}

export function filterNotesByTag(tag, notesContainer) {
  const notes = loadNotes();
  const filteredNotes = notes.filter(note => note.tags.includes(tag));
  renderNotes(filteredNotes, notesContainer);
}

export function renderNotes(notes, notesContainer) {
  notesContainer.innerHTML = "";
  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.id = `note-${note.id}`;
    noteElement.style.backgroundColor = note.color;
    noteElement.style.width = `${note.size.width}px`;
    noteElement.style.height = `${note.size.height}px`;
    noteElement.style.left = `${note.position.x}px`;
    noteElement.style.top = `${note.position.y}px`;
    noteElement.innerHTML = `
      <div class="note-header"></div>
      <div class="note-content" data-note-id="${note.id}">${note.content}</div>
      <div class="note-tags" data-note-id="${note.id}">
        ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    `;
    notesContainer.appendChild(noteElement);

    // Add edit button
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.dataset.noteId = note.id;
    editButton.textContent = "Edit";
    noteElement.appendChild(editButton);

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.noteId = note.id;
    deleteButton.textContent = "Delete";
    noteElement.appendChild(deleteButton);

    // Show edit and delete buttons on hover
    noteElement.addEventListener("mouseenter", () => {
      editButton.style.display = "block";
      deleteButton.style.display = "block";
    });

    noteElement.addEventListener("mouseleave", () => {
      editButton.style.display = "none";
      deleteButton.style.display = "none";
    });

    // Handle edit button click
    editButton.addEventListener("click", () => {
      openNoteModal(note.id);
    });

    makeNoteDraggable(noteElement, note);
    makeNoteResizable(noteElement, note);
  });
}

export function getNextAvailablePosition(notes) {
  const notesPerRow = 3;
  const noteWidth = 200;
  const noteHeight = 200;
  const margin = 20;

  const takenPositions = notes.map(note => note.position);

  let newPosition;
  let row = 0;
  let col = 0;

  do {
    newPosition = {
      x: col * (noteWidth + margin),
      y: row * (noteHeight + margin)
    };

    col++;
    if (col >= notesPerRow) {
      col = 0;
      row++;
    }
  } while (takenPositions.some(pos => pos.x === newPosition.x && pos.y === newPosition.y));

  return newPosition;
}
