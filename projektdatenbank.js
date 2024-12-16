document.addEventListener('DOMContentLoaded', function() {
      const projektList = document.getElementById('projekt-list');
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');

      projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${project.projektname}</h3>
          <p>Adresse: ${project.adresse.strasse} ${project.adresse.hausnummer}, ${project.adresse.plz} ${project.adresse.ort}, ${project.adresse.land}</p>
        `;
        projektList.appendChild(listItem);
      });
    });
