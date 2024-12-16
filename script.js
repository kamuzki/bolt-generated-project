const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
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

    function displayActiveProject() {
      const activeProject = JSON.parse(localStorage.getItem('activeProject'));
      if (activeProject) {
        activeProjectDiv.innerHTML = `
          <h3>Aktives Projekt:</h3>
          <p>${activeProject.projektname}</p>
          <p>Adresse: ${activeProject.adresse.strasse} ${activeProject.adresse.hausnummer}, ${activeProject.adresse.plz} ${activeProject.adresse.ort}, ${activeProject.adresse.land}</p>
        `;
      } else {
        activeProjectDiv.innerHTML = '';
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
    });

    projekteLink.addEventListener('click', (e) => {
      e.preventDefault();
      projektePopup.style.display = 'block';
      popupOverlay.style.display = 'block';
    });

    popupOverlay.addEventListener('click', () => {
      projektePopup.style.display = 'none';
      neuesProjektPopup.style.display = 'none';
      projektdatenbankPopup.style.display = 'none';
      popupOverlay.style.display = 'none';
    });

    neuesProjektBtn.addEventListener('click', () => {
      projektePopup.style.display = 'none';
      neuesProjektPopup.style.display = 'block';
    });

    projektdatenbankBtn.addEventListener('click', () => {
      projektePopup.style.display = 'none';
      projektdatenbankPopup.style.display = 'block';
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
          projektdatenbankPopup.style.display = 'none';
          popupOverlay.style.display = 'none';
        });
        projektList.appendChild(listItem);
      });
    });

    abbrechenBtn.addEventListener('click', () => {
      neuesProjektPopup.style.display = 'none';
      popupOverlay.style.display = 'none';
    });

    zurueckBtn.addEventListener('click', () => {
      projektdatenbankPopup.style.display = 'none';
      popupOverlay.style.display = 'none';
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

      neuesProjektPopup.style.display = 'none';
      projektdatenbankPopup.style.display = 'block';
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
          projektdatenbankPopup.style.display = 'none';
          popupOverlay.style.display = 'none';
        });
        projektList.appendChild(listItem);
      });
    });
