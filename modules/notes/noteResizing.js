import { loadNotes, saveNotes } from './noteStorage.js';

export function makeNoteResizable(noteElement, note) {
  let isResizing = false;
  let startWidth, startHeight, startPosX, startPosY;

  const resizer = document.createElement("div");
  resizer.classList.add("resizer");
  noteElement.appendChild(resizer);

  resizer.addEventListener("mousedown", (e) => {
    isResizing = true;
    startWidth = noteElement.offsetWidth;
    startHeight = noteElement.offsetHeight;
    startPosX = e.clientX;
    startPosY = e.clientY;
    e.stopPropagation();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;

    const gridCellWidth = 220;
    const gridCellHeight = 220;
    const minWidth = gridCellWidth;
    const minHeight = gridCellHeight;

    let newWidth = startWidth + (e.clientX - startPosX);
    let newHeight = startHeight + (e.clientY - startPosY);

    // Snap to grid
    newWidth = Math.max(minWidth, Math.round(newWidth / gridCellWidth) * gridCellWidth);
    newHeight = Math.max(minHeight, Math.round(newHeight / gridCellHeight) * gridCellHeight);

    // Reset to default size if it's a single grid cell
    if (newWidth === gridCellWidth && newHeight === gridCellHeight) {
      newWidth = 200;
      newHeight = 200;
    }

    // Prevent overlap
    if (!isOverlap(noteElement, newWidth, newHeight)) {
      noteElement.style.width = `${newWidth}px`;
      noteElement.style.height = `${newHeight}px`;

      note.size = { width: newWidth, height: newHeight };
    }
  });

  document.addEventListener("mouseup", () => {
    if (isResizing) {
      isResizing = false;

      // Also reset to default size here if needed
      if (note.size.width === 220 && note.size.height === 220) {
        note.size = { width: 200, height: 200 };
        noteElement.style.width = `200px`;
        noteElement.style.height = `200px`;
      }

      let notes = loadNotes();
      const noteIndex = notes.findIndex((n) => n.id === note.id);
      if (noteIndex !== -1) {
        notes[noteIndex] = note;
        saveNotes(notes);
      }
    }
  });
}

function isOverlap(noteElement, newWidth, newHeight) {
  const notes = loadNotes();
  const currentNoteRect = noteElement.getBoundingClientRect();

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id.toString() === noteElement.id.split('-')[1]) continue;

    const otherNoteElement = document.getElementById(`note-${notes[i].id}`);
    const otherNoteRect = otherNoteElement.getBoundingClientRect();

    const tempRect = {
      left: currentNoteRect.left,
      top: currentNoteRect.top,
      right: currentNoteRect.left + newWidth,
      bottom: currentNoteRect.top + newHeight
    };

    if (
      tempRect.left < otherNoteRect.right &&
      tempRect.right > otherNoteRect.left &&
      tempRect.top < otherNoteRect.bottom &&
      tempRect.bottom > otherNoteRect.top
    ) {
      return true;
    }
  }

  return false;
}
