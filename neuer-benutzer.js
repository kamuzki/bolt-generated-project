document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('neuer-benutzer-form');

      form.addEventListener('submit', function(event) {
        event.preventDefault();

        const vorname = document.getElementById('vorname').value;
        const nachname = document.getElementById('nachname').value;
        const email = document.getElementById('email').value;
        const passwort = document.getElementById('passwort').value;

        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vorname: vorname,
            nachname: nachname,
            email: email,
            passwort: passwort
          }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
          alert('Benutzer erfolgreich erstellt!');

          // Schließe das Popup und aktualisiere die Benutzerdatenbank
          const neuerBenutzerPopup = document.getElementById('neuer-benutzer-popup');
          closePopup(neuerBenutzerPopup);

          // Benutzer zur Liste in benutzerdatenbank.html hinzufügen
          const benutzerList = document.querySelector('#benutzerdatenbank-popup .benutzer-list');
          if (benutzerList) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <h3>${vorname} ${nachname}</h3>
              <p>Email: ${email}</p>
            `;
            benutzerList.appendChild(listItem);
          }

          // Optional: Direkt zur Benutzerdatenbank wechseln
          // window.location.href = '/benutzerdatenbank.html';
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Fehler beim Erstellen des Benutzers.');
        });
      });
    });
