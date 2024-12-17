document.addEventListener('DOMContentLoaded', function() {
      const projektList = document.getElementById('projekt-list');

      fetch('http://localhost:3000/projects')
        .then(response => response.json())
        .then(projects => {
          projects.forEach(project => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <h3>${project.projektname}</h3>
              <p>Adresse: ${project.adresse.strasse} ${project.adresse.hausnummer}, ${project.adresse.plz} ${project.adresse.ort}, ${project.adresse.land}</p>
            `;
            projektList.appendChild(listItem);
          });
        })
        .catch(error => console.error('Error fetching projects:', error));
    });
