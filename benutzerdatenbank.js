document.addEventListener('DOMContentLoaded', function() {
      const benutzerList = document.getElementById('benutzer-list');

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
    });
