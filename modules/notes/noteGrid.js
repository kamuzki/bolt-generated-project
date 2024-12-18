export function createGridCells(notesContainer) {
    const gridOverlay = document.getElementById('grid-overlay');
    const gridCellWidth = 220; // Adjust based on your grid cell size
    const gridCellHeight = 220; // Adjust based on your grid cell size
    const gridContainerWidth = notesContainer.offsetWidth;
    const gridContainerHeight = notesContainer.offsetHeight;

    const numCols = Math.floor(gridContainerWidth / gridCellWidth);
    const numRows = Math.floor(gridContainerHeight / gridCellHeight);

    gridOverlay.innerHTML = ''; // Clear any existing grid cells

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.style.left = `${col * gridCellWidth}px`;
        gridCell.style.top = `${row * gridCellHeight}px`;
        gridCell.style.width = `${gridCellWidth}px`;
        gridCell.style.height = `${gridCellHeight}px`;
        gridOverlay.appendChild(gridCell);
      }
    }
  }
