export function initNavigation() {
      const homeLink = document.getElementById('home-link');
      const notesLink = document.getElementById('notes-link');
      const tasksLink = document.getElementById('tasks-link');
      
      homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/';
      });
    
      notesLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/notes.html';
      });
    
      tasksLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/tasks.html';
      });
    }
