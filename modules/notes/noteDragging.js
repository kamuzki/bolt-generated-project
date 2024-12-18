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
  
    // Check for collisions and prevent overlap
    if (!isOverlapping(noteElement, newX, newY, noteElement.offsetWidth, noteElement.offsetHeight)) {
      noteElement.style.left = `${newX}px`;
      noteElement.style.top = `${newY}px`;
    } else {
      // If overlapping, try to find the next available position
      const adjustedPosition = findNextAvailablePosition(noteElement, newX, newY);
      noteElement.style.left = `${adjustedPosition.x}px`;
      noteElement.style.top = `${adjustedPosition.y}px`;
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

function isOverlapping(noteElement, newX, newY, width, height) {
  const notes = loadNotes();
  const currentRect = {
    left: newX,
    top: newY,
    right: newX + width,
    bottom: newY + height
  };

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id.toString() === noteElement.id.split('-')[1]) continue;

    const otherNote = document.getElementById(`note-${notes[i].id}`);
    const otherRect = otherNote.getBoundingClientRect();

    if (
      currentRect.left < otherRect.right &&
      currentRect.right > otherRect.left &&
      currentRect.top < otherRect.bottom &&
      currentRect.bottom > otherRect.top
    ) {
      return true;
    }
  }

  return false;
}

function findNextAvailablePosition(noteElement, startX, startY) {
  const notes = loadNotes();
  const gridCellWidth = 220;
  const gridCellHeight = 220;
  const margin = 20;
  const notesContainer = document.getElementById('notes-container');

  let newX = startX;
  let newY = startY;

  while (isOverlapping(noteElement, newX, newY, noteElement.offsetWidth, noteElement.offsetHeight)) {
    newX += gridCellWidth + margin;
    if (newX + noteElement.offsetWidth > notesContainer.offsetWidth) {
      newX = 0;
      newY += gridCellHeight + margin;
    }
  }

  return { x: newX, y: newY };
}
