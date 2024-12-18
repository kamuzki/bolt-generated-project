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
      const noteModal = document.getElementById("note-modal");
      const closeNoteModal = document.getElementById("close-note-modal");
      const noteForm = document.getElementById("note-form");
      const noteContentInput = document.getElementById("note-content");
      let selectedNoteColor = "#ffffcc";

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
        pageContent.appendChild(addNoteButton);
        pageContent.appendChild(notesContainer);

        renderNotes(loadNotes(), notesContainer);
      });

      // Open the new note modal when the "Add Note" button is clicked
      pageContent.addEventListener("click", (e) => {
        if (e.target.id === "add-note-button") {
          noteModal.style.display = "block";
          document.body.classList.add("modal-open");

          // Add the close button to the modal
          const closeButton = document.createElement("span");
          closeButton.classList.add("close-button");
          closeButton.innerHTML = "&times;";
          closeButton.addEventListener("click", () => {
            noteModal.style.display = "none";
            document.body.classList.remove("modal-open");
          });
          noteModal.querySelector(".popup-content").appendChild(closeButton);

          // Initialize color palette
          const colorPalette = document.getElementById("color-palette");
          const colorOptions = colorPalette.querySelectorAll(".color-option");
          colorOptions.forEach(option => {
            option.addEventListener("click", () => {
              selectedNoteColor = option.getAttribute("data-color");
              // Remove the active class from all options
              colorOptions.forEach((opt) => opt.classList.remove("active"));
              // Add the active class to the selected option
              option.classList.add("active");
            });
          });
        }
      });

      // Close the new note modal
      closeNoteModal.addEventListener("click", () => {
        noteModal.style.display = "none";
        document.body.classList.remove("modal-open");
      });

      // Handle new note form submission
      noteForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newNote = {
          id: Date.now(),
          content: noteContentInput.value,
          color: selectedNoteColor,
          position: getNextAvailablePosition(loadNotes()),
          size: { width: 200, height: 200 },
        };

        let notes = loadNotes();
        notes.push(newNote);
        saveNotes(notes);
        renderNotes(notes, notesContainer);

        noteContentInput.value = "";
        noteModal.style.display = "none";
        document.body.classList.remove("modal-open");
      });

      // Event delegation for edit and delete icons
      notesContainer.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("edit-icon")) {
          const noteId = parseInt(target.dataset.noteId);
          const noteElement = document.getElementById(`note-${noteId}`);
          editNote(noteId, noteElement, notesContainer);
        } else if (target.classList.contains("delete-icon")) {
          const noteId = parseInt(target.dataset.noteId);
          deleteNote(noteId, notesContainer);
        }
      });
    }

    function getNextAvailablePosition(notes) {
      const maxColumns = 3;
      let nextRow = 1;
      let nextColumn = 1;

      while (
        notes.some(
          (note) =>
            note.position.row === nextRow && note.position.column === nextColumn
        )
      ) {
        nextColumn++;
        if (nextColumn > maxColumns) {
          nextColumn = 1;
          nextRow++;
        }
      }

      return { row: nextRow, column: nextColumn };
    }

    function renderNotes(notes, notesContainer) {
      notesContainer.innerHTML = "";
      notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.id = `note-${note.id}`;
        noteElement.style.backgroundColor = note.color;
        noteElement.style.width = `${note.size.width}px`;
        noteElement.style.height = `${note.size.height}px`;
        noteElement.innerHTML = `
          <div class="note-header">
            <span class="edit-icon" data-note-id="${note.id}">✏️</span>
            <span class="delete-icon" data-note-id="${note.id}">❌</span>
          </div>
          <div class="note-content" data-note-id="${note.id}">${note.content}</div>
        `;
        notesContainer.appendChild(noteElement);

        makeNoteDraggable(noteElement, note);
        makeNoteResizable(noteElement, note);

        // Initially hide the edit and delete icons
        const editIcon = noteElement.querySelector(".edit-icon");
        const deleteIcon = noteElement.querySelector(".delete-icon");
        editIcon.style.visibility = "hidden";
        deleteIcon.style.visibility = "hidden";

        // Show icons on mouse hover
        noteElement.addEventListener("mouseenter", () => {
          editIcon.style.visibility = "visible";
          deleteIcon.style.visibility = "visible";
        });

        noteElement.addEventListener("mouseleave", () => {
          editIcon.style.visibility = "hidden";
          deleteIcon.style.visibility = "hidden";
        });
      });
    }

    function editNote(noteId, noteElement, notesContainer) {
      const noteContentElement = noteElement.querySelector(`.note-content[data-note-id="${noteId}"]`);
      const currentContent = noteContentElement.textContent;
    
      const textarea = document.createElement("textarea");
      textarea.value = currentContent;
      textarea.style.width = "100%";
      textarea.style.height = "100%";
      textarea.style.resize = "none";
      textarea.style.border = "none";
      textarea.style.backgroundColor = noteElement.style.backgroundColor;
      textarea.style.color = noteElement.style.color;
      textarea.style.padding = "0";
      textarea.style.fontFamily = "inherit";
      textarea.style.fontSize = "inherit";
    
      noteContentElement.innerHTML = "";
      noteContentElement.appendChild(textarea);
    
      textarea.focus();
    
      function handleTextareaBlur() {
        const updatedContent = textarea.value;
        noteContentElement.innerHTML = updatedContent;
    
        let notes = loadNotes();
        const noteIndex = notes.findIndex((n) => n.id === noteId);
        if (noteIndex !== -1) {
          notes[noteIndex].content = updatedContent;
          saveNotes(notes);
        }
    
        // Clean up the event listener to prevent memory leaks
        textarea.removeEventListener("blur", handleTextareaBlur);
      }
    
      textarea.addEventListener("blur", handleTextareaBlur);
    }

    function deleteNote(noteId, notesContainer) {
      let notes = loadNotes();
      notes = notes.filter((n) => n.id !== noteId);
      saveNotes(notes);
      renderNotes(notes, notesContainer);
    }

    function makeNoteDraggable(noteElement, note) {
      let isDragging = false;
      let startPosX, startPosY;
    
      noteElement.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("note-header") || e.target.tagName === "SPAN") {
          e.preventDefault(); // Prevent text selection during drag
          isDragging = true;
          startPosX = e.clientX - noteElement.offsetLeft;
          startPosY = e.clientY - noteElement.offsetTop;
          noteElement.style.zIndex = 1000;
        }
      });
    
      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
    
        const x = e.clientX - startPosX;
        const y = e.clientY - startPosY;
    
        noteElement.style.left = `${x}px`;
        noteElement.style.top = `${y}px`;
      });
    
      document.addEventListener("mouseup", () => {
        if (isDragging) {
          isDragging = false;
          noteElement.style.zIndex = "auto";
    
          // Update note position in the array
          let notes = loadNotes();
          const noteIndex = notes.findIndex((n) => n.id === note.id);
          if (noteIndex !== -1) {
            note.position = {
              x: noteElement.offsetLeft,
              y: noteElement.offsetTop
            };
            notes[noteIndex] = note;
            saveNotes(notes);
          }
        }
      });
    }

    function makeNoteResizable(noteElement, note) {
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

    function loadNotes() {
      return JSON.parse(localStorage.getItem("notes") || "[]");
    }

    function saveNotes(notes) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
