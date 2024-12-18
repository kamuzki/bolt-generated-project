import { openNoteModal, deleteNote, filterNotes, filterNotesByTag, renderNotes, getNextAvailablePosition } from './notes/noteActions.js';
import { makeNoteDraggable } from './notes/noteDragging.js';
import { makeNoteResizable } from './notes/noteResizing.js';
import { loadNotes, saveNotes } from './notes/noteStorage.js';
import { createGridCells } from './notes/noteGrid.js';
import './notes/noteComponent.css';
import './notes/modal.css';
import './notes/grid.css';

export function initNotes() {
  const notesLink = document.getElementById("notes-link");
  const pageContent = document.getElementById("page-content");
  const originalHeader = document.querySelector(".header-title");
  const authButtons = document.getElementById("auth-buttons-container");
  const notesHeader = document.getElementById("notes-page-header");
  const addNoteButton = document.createElement("button");
  addNoteButton.id = "add-note-button";
  addNoteButton.textContent = "Neue Notiz hinzufügen";
  const notesContainer = document.createElement("div");
  notesContainer.id = "notes-container";

  // Add search input field
  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Notizen durchsuchen...');
  searchInput.id = 'search-notes';
  searchInput.classList.add('search-input');

  // Create grid overlay
  const gridOverlay = document.createElement('div');
  gridOverlay.id = 'grid-overlay';
  gridOverlay.classList.add('grid-overlay');
  pageContent.appendChild(gridOverlay);

  // Display the notes content in the main area when the "Notes" link is clicked
  notesLink.addEventListener("click", (e) => {
    e.preventDefault();
    originalHeader.style.display = "none";
    authButtons.style.display = "none";
    notesHeader.style.display = "block";
    pageContent.innerHTML = "";

    // Apply flexbox to center the button
    pageContent.style.display = "flex";
    pageContent.style.flexDirection = "column";
    pageContent.style.alignItems = "center";

    // Append the header, add-note button and notes container
    pageContent.appendChild(notesHeader);
    pageContent.appendChild(searchInput);
    pageContent.appendChild(addNoteButton);
    pageContent.appendChild(notesContainer);
    pageContent.appendChild(gridOverlay);

    // Create grid cells
    createGridCells(notesContainer);

    renderNotes(loadNotes(), notesContainer);
  });

  // Add event listener for search input
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    const filteredNotes = filterNotes(searchTerm);
    renderNotes(filteredNotes, notesContainer);
  });

  // Open the new note modal when the "Add Note" button is clicked
  pageContent.addEventListener("click", (e) => {
    if (e.target.id === "add-note-button") {
      openNoteModal();
    }
  });

  // Event delegation for delete icon
  notesContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("delete-icon")) {
      const noteId = parseInt(target.dataset.noteId);
      deleteNote(noteId, notesContainer);
    } else if (target.classList.contains("tag")) {
      const tag = target.textContent;
      filterNotesByTag(tag, notesContainer);
    }
  });
}
