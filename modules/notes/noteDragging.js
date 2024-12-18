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

    noteElement.style.left = `${startPosX + offsetX}px`;
    noteElement.style.top = `${startPosY + offsetY}px`;
  });

  document.addEventListener("mouseup", (e) => {
    if (isDragging) {
      isDragging = false;
      noteElement.style.zIndex = "auto";

      // Calculate nearest grid position
      const gridCellWidth = 220; // Adjust based on your grid cell size
      const gridCellHeight = 220; // Adjust based on your grid cell size
      const newX = Math.round(noteElement.offsetLeft / gridCellWidth) * gridCellWidth;
      const newY = Math.round(noteElement.offsetTop / gridCellHeight) * gridCellHeight;

      // Snap to grid
      noteElement.style.left = `${newX}px`;
      noteElement.style.top = `${newY}px`;

      // Update note position in the array
      let notes = loadNotes();
      const noteIndex = notes.findIndex((n) => n.id === note.id);
      if (noteIndex !== -1) {
        note.position = {
          x: newX,
          y: newY
        };
        notes[noteIndex] = note;
        saveNotes(notes);
      }

      // Hide grid overlay
      document.getElementById('grid-overlay').style.display = 'none';
    }
  });
}
