const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const header = document.querySelector('.header');
    const projekteLink = document.getElementById('projekte-link');
    const projektePopup = document.getElementById('projekte-popup');
    const popupOverlay = document.getElementById('popup-overlay');
    const neuesProjektBtn = document.getElementById('neues-projekt-btn');
    const projektdatenbankBtn = document.getElementById('projektdatenbank-btn');
    const neuesProjektPopup = document.getElementById('neues-projekt-popup');
    const projektdatenbankPopup = document.getElementById('projektdatenbank-popup');
    const abbrechenBtn = document.getElementById('abbrechen-btn');
    const zurueckBtn = document.getElementById('zurueck-btn');
    const activeProjectDiv = document.getElementById('active-project');
    const activeProjectButton = document.getElementById('active-project-button');
    const activeProjectButtonContainer = document.getElementById('active-project-button-container');
    const activeProjectName = document.getElementById('active-project-name');
    const editProjectButton = document.getElementById('edit-project-button');
    const changeProjectButton = document.getElementById('change-project-button');
    const editProjektPopup = document.getElementById('edit-projekt-popup');
    const editAbbrechenBtn = document.getElementById('edit-abbrechen-btn');
    const editProjektForm = document.getElementById('edit-projekt-form');
    const protokolleLink = document.getElementById('protokolle-link');
    const protokollePopup = document.getElementById('protokolle-popup');
    const neuesProtokollBtn = document.getElementById('neues-protokoll-btn');
    const protokolldatenbankBtn = document.getElementById('protokolldatenbank-btn');
    const benutzerLink = document.getElementById('benutzer-link');
    const benutzerPopup = document.getElementById('benutzer-popup');
    const neuerBenutzerBtn = document.getElementById('neuer-benutzer-btn');
    const benutzerdatenbankBtn = document.getElementById('benutzerdatenbank-btn');
    const kontakteLink = document.getElementById('kontakte-link');
    const kontaktePopup = document.getElementById('kontakte-popup');
    const neuerKontaktBtn = document.getElementById('neuer-kontakt-btn');
    const kontaktDatenbankBtn = document.getElementById('kontakt-datenbank-btn');
    const kontaktAbbrechenBtn = document.getElementById('kontakt-abbrechen-btn');
    const neuesProtokollPopup = document.getElementById('neues-protokoll-popup');
    const protokollAbbrechenBtn = document.getElementById('protokoll-abbrechen-btn');
    const neuerKontaktPopup = document.getElementById('neuer-kontakt-popup');
    const neuerBenutzerPopup = document.getElementById('neuer-benutzer-popup');
    const benutzerdatenbankPopup = document.getElementById('benutzerdatenbank-popup');
    const homeLink = document.getElementById('home-link');
    const notesLink = document.getElementById('notes-link');
    const tasksLink = document.getElementById('tasks-link');

    let currentActiveProject = null;
    let editButtonVisible = false;

    function displayActiveProject() {
      const activeProject = JSON.parse(localStorage.getItem('activeProject'));
      if (activeProject) {
        activeProjectName.textContent = activeProject.projektname;
        activeProjectButtonContainer.style.display = 'flex';
        activeProjectDiv.innerHTML = `
          <h3>Aktives Projekt:</h3>
          <p>${activeProject.projektname}</p>
          <p>Adresse:</p>
          <p>Straße: ${activeProject.adresse.strasse}</p>
          <p>Hausnummer: ${activeProject.adresse.hausnummer}</p>
          <p>Postleitzahl: ${activeProject.adresse.plz}</p>
          <p>Ort: ${activeProject.adresse.ort}</p>
          <p>Land: ${activeProject.adresse.land}</p>
        `;
        currentActiveProject = activeProject;
      } else {
        activeProjectName.textContent = '';
        activeProjectButtonContainer.style.display = 'none';
        activeProjectDiv.innerHTML = '';
        currentActiveProject = null;
      }
    }

    displayActiveProject();

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const icon = themeToggle.querySelector('i');
      if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    });

    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      updateMainContentMargin();
    });

    function updateMainContentMargin() {
      if (sidebar.classList.contains('collapsed')) {
        mainContent.style.marginLeft = '90px';
        header.style.left = '90px';
        header.style.width = 'calc(100% - 90px)';
      } else {
        mainContent.style.marginLeft = '270px';
        header.style.left = '270px';
        header.style.width = 'calc(100% - 270px)';
      }
    }

    updateMainContentMargin();

    function openPopup(popup) {
      popup.style.display = 'block';
      popup.classList.add('active');
      popupOverlay.style.display = 'block';
      popupOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      adjustPopupSize(popup);
    }

    function closePopup(popup) {
      popup.classList.remove('active');
      popupOverlay.classList.remove('active');
      setTimeout(() => {
        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }

    function adjustPopupSize(popup) {
      const popupContent = popup.querySelector('.popup-content');
      popup.style.height = 'auto';
      popup.style.width = 'auto';
      popupContent.style.maxHeight = '80vh';
      popupContent.style.maxWidth = '90vw';

      const maxHeight = window.innerHeight * 0.9;
      const maxWidth = window.innerWidth * 0.9;

      if (popup.offsetHeight > maxHeight) {
        popup.style.height = `${maxHeight}px`;
        popupContent.style.maxHeight = `${maxHeight - 50}px`;
      }

      if (popup.offsetWidth > maxWidth) {
        popup.style.width = `${maxWidth}px`;
        popupContent.style.maxWidth = `${maxWidth - 50}px`;
      }
    }

    projekteLink.addEventListener('click', (e) => {
      e.preventDefault();
      openPopup(projektePopup);
    });

    popupOverlay.addEventListener('click', (event) => {
      if (event.target === popupOverlay) {
        const activePopup = document.querySelector('.popup.active');
        if (activePopup) {
          closePopup(activePopup);
        }
      }
    });

    neuesProjektBtn.addEventListener('click', () => {
      closePopup(projektePopup);
      openPopup(neuesProjektPopup);
    });

    projektdatenbankBtn.addEventListener('click', () => {
      closePopup(projektePopup);
      openPopup(projektdatenbankPopup);
      const projektList = document.getElementById('projekt-list');
      projektList.innerHTML = '';
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');

      projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${project.projektname}</h3>
          <p>Adresse: ${project.adresse.strasse} ${project.adresse.hausnummer}, ${project.adresse.plz} ${project.adresse.ort}, ${project.adresse.land}</p>
        `;
        listItem.addEventListener('click', () => {
          localStorage.setItem('activeProject', JSON.stringify(project));
          displayActiveProject();
          closePopup(projektdatenbankPopup);
        });
        projektList.appendChild(listItem);
      });
    });

    abbrechenBtn.addEventListener('click', () => {
      closePopup(neuesProjektPopup);
    });

    zurueckBtn.addEventListener('click', () => {
      closePopup(projektdatenbankPopup);
    });

    activeProjectButton.addEventListener('click', () => {
      editButtonVisible = !editButtonVisible;
      editProjectButton.style.display = editButtonVisible ? 'inline-block' : 'none';
      changeProjectButton.style.display = editButtonVisible ? 'inline-block' : 'none';
    });

    editProjectButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (currentActiveProject) {
        document.getElementById('edit-projektname').value = currentActiveProject.projektname;
        document.getElementById('edit-strasse').value = currentActiveProject.adresse.strasse;
        document.getElementById('edit-hausnummer').value = currentActiveProject.adresse.hausnummer;
        document.getElementById('edit-plz').value = currentActiveProject.adresse.plz;
        document.getElementById('edit-ort').value = currentActiveProject.adresse.ort;
        document.getElementById('edit-land').value = currentActiveProject.adresse.land;
        openPopup(editProjektPopup);
      }
    });

    changeProjectButton.addEventListener('click', (event) => {
      event.stopPropagation();
      openPopup(projektdatenbankPopup);
    });

    editAbbrechenBtn.addEventListener('click', () => {
      closePopup(editProjektPopup);
    });

    editProjektForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const editProjektname = document.getElementById('edit-projektname').value;
      const editStrasse = document.getElementById('edit-strasse').value;
      const editHausnummer = document.getElementById('edit-hausnummer').value;
      const editPlz = document.getElementById('edit-plz').value;
      const editOrt = document.getElementById('edit-ort').value;
      const editLand = document.getElementById('edit-land').value;

      if (currentActiveProject) {
        const updatedProject = {
          ...currentActiveProject,
          projektname: editProjektname,
          adresse: {
            strasse: editStrasse,
            hausnummer: editHausnummer,
            plz: editPlz,
            ort: editOrt,
            land: editLand
          }
        };

        let projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const projectIndex = projects.findIndex(project => project.projektname === currentActiveProject.projektname && project.adresse.strasse === currentActiveProject.adresse.strasse && project.adresse.hausnummer === currentActiveProject.adresse.hausnummer && project.adresse.plz === currentActiveProject.adresse.plz && project.adresse.ort === currentActiveProject.adresse.ort && project.adresse.land === currentActiveProject.adresse.land);
        if (projectIndex !== -1) {
          projects[projectIndex] = updatedProject;
          localStorage.setItem('projects', JSON.stringify(projects));
        }
        localStorage.setItem('activeProject', JSON.stringify(updatedProject));
        displayActiveProject();
        closePopup(editProjektPopup);
      }
    });

    document.getElementById('neues-projekt-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const projektname = document.getElementById('projektname').value;
      const strasse = document.getElementById('strasse').value;
      const hausnummer = document.getElementById('hausnummer').value;
      const plz = document.getElementById('plz').value;
      const ort = document.getElementById('ort').value;
      const land = document.getElementById('land').value;

      const newProject = {
        projektname: projektname,
        adresse: {
          strasse: strasse,
          hausnummer: hausnummer,
          plz: plz,
          ort: ort,
          land: land
        }
      };

      let projects = JSON.parse(localStorage.getItem('projects') || '[]');
      projects.push(newProject);
      localStorage.setItem('projects', JSON.stringify(projects));
      localStorage.setItem('activeProject', JSON.stringify(newProject));
      displayActiveProject();

      closePopup(neuesProjektPopup);
      openPopup(projektdatenbankPopup);
      const projektList = document.getElementById('projekt-list');
      projektList.innerHTML = '';
      const updatedProjects = JSON.parse(localStorage.getItem('projects') || '[]');

      updatedProjects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${project.projektname}</h3>
          <p>Adresse: ${project.adresse.strasse} ${project.adresse.hausnummer}, ${project.adresse.plz} ${project.adresse.ort}, ${project.adresse.land}</p>
        `;
        listItem.addEventListener('click', () => {
          localStorage.setItem('activeProject', JSON.stringify(project));
          displayActiveProject();
          closePopup(projektdatenbankPopup);
        });
        projektList.appendChild(listItem);
      });
    });

    protokolleLink.addEventListener('click', (e) => {
      e.preventDefault();
      openPopup(protokollePopup);
    });

    neuesProtokollBtn.addEventListener('click', () => {
      closePopup(protokollePopup);
      openPopup(neuesProtokollPopup);
    });

    protokolldatenbankBtn.addEventListener('click', () => {
      closePopup(protokollePopup);
      window.location.href = '/protokolldatenbank.html';
    });

    benutzerLink.addEventListener('click', (e) => {
      e.preventDefault();
      openPopup(benutzerPopup);
    });

    neuerBenutzerBtn.addEventListener('click', () => {
      closePopup(benutzerPopup);
      openPopup(neuerBenutzerPopup);
    });

    benutzerdatenbankBtn.addEventListener('click', () => {
      closePopup(benutzerPopup);
      // Benutzerdatenbank als Popup öffnen
      fetchBenutzerdatenbank();
    });

    kontakteLink.addEventListener('click', (e) => {
      e.preventDefault();
      openPopup(kontaktePopup);
    });

    neuerKontaktBtn.addEventListener('click', () => {
      closePopup(kontaktePopup);
      openPopup(neuerKontaktPopup);
    });

    kontaktDatenbankBtn.addEventListener('click', () => {
      closePopup(kontaktePopup);
      window.location.href = '/kontakt-datenbank.html';
    });

    kontaktAbbrechenBtn.addEventListener('click', () => {
      closePopup(neuerKontaktPopup);
    });

    protokollAbbrechenBtn.addEventListener('click', () => {
      closePopup(neuesProtokollPopup);
    });

    // Funktion zum Abrufen und Anzeigen der Benutzerdatenbank im Popup
    function fetchBenutzerdatenbank() {
      openPopup(benutzerdatenbankPopup);
      const benutzerList = document.getElementById('benutzer-list');
      benutzerList.innerHTML = '';

      fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
          users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <h3>${user.vorname} ${user.nachname}</h3>
              <p>Email: ${user.email}</p>
            `;
            benutzerList.appendChild(listItem);
          });
        })
        .catch(error => console.error('Error fetching users:', error));
    }

    document.addEventListener('DOMContentLoaded', () => {
      const sidebar = document.querySelector('.sidebar');
      const mainNavItems = sidebar.querySelectorAll('.main-nav-item');
    
      mainNavItems.forEach(item => {
        const link = item.querySelector('a');
        const subNav = item.querySelector('.sub-nav');
    
        if (link && subNav) {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            const isSubNavVisible = subNav.style.display !== 'none';
    
            mainNavItems.forEach(otherItem => {
              const otherSubNav = otherItem.querySelector('.sub-nav');
              if (otherSubNav && otherItem !== item) {
                otherSubNav.style.display = 'none';
                otherItem.classList.remove('active');
              }
            });
    
            if (isSubNavVisible) {
              subNav.style.display = 'none';
              item.classList.remove('active');
            } else {
              subNav.style.display = 'block';
              item.classList.add('active');
            }
          });
        }
      });
    });

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
