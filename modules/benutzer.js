import { initPopup } from './popup.js';

    export function initBenutzer() {
      const { openPopup, closePopup } = initPopup();
      const benutzerLink = document.getElementById('benutzer-link');
      const benutzerPopup = document.getElementById('benutzer-popup');
      const neuerBenutzerBtn = document.getElementById('neuer-benutzer-btn');
      const benutzerdatenbankBtn = document.getElementById('benutzerdatenbank-btn');
      const neuerBenutzerPopup = document.getElementById('neuer-benutzer-popup');
      const benutzerdatenbankPopup = document.getElementById('benutzerdatenbank-popup');

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
    }
