import { loadNotes, saveNotes } from './noteStorage.js';

export function makeNoteDraggable(noteElement, note) {
  let isDragging = false;
  let startPosX, startPosY;
  let startMouseX, startMouseY;

  noteElement.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("note-header") || e.target.tagName === "SPAN" || e.target.tagName === "H3") {
      e.preventDefault();
      isDragging = true;
      startPosX = noteElement.offsetLeft;
      startPosY = noteElement.offsetTop;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      noteElement.style.zIndex = 1000;

      // Show grid overlay
      document.getElementById('grid-overlay').style.display = 'block';
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
  
    const offsetX = e.clientX - startMouseX;
    const offsetY = e.clientY - startMouseY;
  
    const gridCellWidth = 220;
    const gridCellHeight = 220;
  
    // Snap the dragged note to the grid immediately
    let newX = Math.round((startPosX + offsetX) / gridCellWidth) * gridCellWidth;
    let newY = Math.round((startPosY + offsetY) / gridCellHeight) * gridCellHeight;
  
    noteElement.style.left = `${newX}px`;
    noteElement.style.top = `${newY}px`;
  
    // Check for collisions and move the overlapped note
    const overlappedNote = getOverlappedNote(noteElement);
    if (overlappedNote) {
      moveNoteToNextAvailable(overlappedNote);
    }
  });

  document.addEventListener("mouseup", (e) => {
    if (!isDragging) return;

    isDragging = false;
    noteElement.style.zIndex = "auto";

    // Calculate nearest grid position
    const gridCellWidth = 220;
    const gridCellHeight = 220;
    const newX = parseInt(noteElement.style.left, 10);
    const newY = parseInt(noteElement.style.top, 10);

    // Update note position in the array
    let notes = loadNotes();
    const noteIndex = notes.findIndex((n) => n.id === note.id);
    if (noteIndex !== -1) {
      note.position = { x: newX, y: newY };
      notes[noteIndex] = note;
      saveNotes(notes);
    }

    // Hide grid overlay
    document.getElementById('grid-overlay').style.display = 'none';
  });
}

function getOverlappedNote(currentNote) {
  const notes = loadNotes();
  const currentRect = currentNote.getBoundingClientRect();

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id.toString() === currentNote.id.split('-')[1]) continue;

    const otherNote = document.getElementById(`note-${notes[i].id}`);
    const otherRect = otherNote.getBoundingClientRect();

    if (
      currentRect.left < otherRect.right &&
      currentRect.right > otherRect.left &&
      currentRect.top < otherRect.bottom &&
      currentRect.bottom > otherRect.top
    ) {
      return { element: otherNote, data: notes[i] };
    }
  }

  return null;
}

function moveNoteToNextAvailable(note) {
  const notes = loadNotes();
  const gridCellWidth = 220;
  const gridCellHeight = 220;
  const margin = 20;
  const notesContainer = document.getElementById('notes-container');

  let newPosition = { x: 0, y: 0 };
  let foundPosition = false;

  while (!foundPosition) {
    foundPosition = true;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === note.data.id) continue;

      const otherNote = document.getElementById(`note-${notes[i].id}`);
      if (!otherNote) continue; // Skip if note element not found
      const otherRect = otherNote.getBoundingClientRect();

      if (
        newPosition.x + gridCellWidth > otherRect.left &&
        newPosition.x < otherRect.right &&
        newPosition.y + gridCellHeight > otherRect.top &&
        newPosition.y < otherRect.bottom
      ) {
        foundPosition = false;
        newPosition.x += gridCellWidth + margin;
        if (newPosition.x + gridCellWidth > notesContainer.offsetWidth) {
          newPosition.x = 0;
          newPosition.y += gridCellHeight + margin;
        }
        break;
      }
    }
  }

  note.element.style.left = `${newPosition.x}px`;
  note.element.style.top = `${newPosition.y}px`;
  note.data.position = newPosition;

  const noteIndex = notes.findIndex((n) => n.id === note.data.id);
  if (noteIndex !== -1) {
    notes[noteIndex] = note.data;
    saveNotes(notes);
  }
}
