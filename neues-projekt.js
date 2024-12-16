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

      window.location.href = '/projektdatenbank.html';
    });
