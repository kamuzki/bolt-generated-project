import { createClient } from '@libsql/client';

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const pageContent = document.getElementById('page-content');

    const db = createClient({
      url: 'file:baujournal.db'
    });

    async function initDB() {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS projects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT
        )
      `);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          password TEXT NOT NULL
        )
      `);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS protocols (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT
        )
      `);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT,
          phone TEXT
        )
      `);
    }

    initDB().catch(err => console.error("Failed to initialize DB:", err));

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });

    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });

    const navLinks = document.querySelectorAll('.sidebar nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const href = link.getAttribute('href');
        fetch(href + '.html')
          .then(response => {
            if (!response.ok) {
              pageContent.innerHTML = `<p>Seite nicht gefunden: ${href}</p>`;
              return;
            }
            return response.text();
          })
          .then(html => {
            pageContent.innerHTML = html;
            if (href === '/projekte') {
              addProjectButton();
            }
          })
          .catch(error => {
            pageContent.innerHTML = `<p>Fehler beim Laden der Seite: ${error}</p>`;
          });
      });
    });

    function addProjectButton() {
      const button = document.createElement('button');
      button.textContent = 'Neues Projekt';
      button.classList.add('new-project-button');
      button.addEventListener('click', showProjectForm);
      pageContent.appendChild(button);
    }

    function showProjectForm() {
      const form = document.createElement('form');
      form.innerHTML = `
        <label>Projektname:</label>
        <input type="text" id="projectName" required>
        <button type="submit">Speichern</button>
      `;
      form.addEventListener('submit', saveProject);
      pageContent.appendChild(form);
    }

    async function saveProject(event) {
      event.preventDefault();
      const projectName = document.getElementById('projectName').value;
      try {
        await db.execute({
          sql: 'INSERT INTO projects (name) VALUES (?)',
          args: [projectName]
        });
        pageContent.innerHTML = '<p>Projekt gespeichert!</p>';
      } catch (error) {
        pageContent.innerHTML = `<p>Fehler beim Speichern des Projekts: ${error}</p>`;
      }
    }
