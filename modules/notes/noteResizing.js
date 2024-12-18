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

    const width = startWidth + (e.clientX - startPosX);
    const height = startHeight + (e.clientY - startPosY);

    noteElement.style.width = `${width}px`;
    noteElement.style.height = `${height}px`;

    note.size = { width, height };
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
    let notes = loadNotes();
    const noteIndex = notes.findIndex((n) => n.id === note.id);
    if (noteIndex !== -1) {
      notes[noteIndex] = note;
      saveNotes(notes);
    }
  });
}
