document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('neuer-kontakt-form');
      const kontaktAbbrechenBtn = document.getElementById('kontakt-abbrechen-btn');
      const neuerKontaktPopup = document.getElementById('neuer-kontakt-popup');

      kontaktAbbrechenBtn.addEventListener('click', () => {
        closePopup(neuerKontaktPopup);
      });

      form.addEventListener('submit', function(event) {
        event.preventDefault();

        const geschlecht = document.getElementById('kontakt-geschlecht').value;
        const vorname = document.getElementById('kontakt-vorname').value;
        const nachname = document.getElementById('kontakt-nachname').value;
        const email = document.getElementById('kontakt-email').value;
        const nummer = document.getElementById('kontakt-nummer').value;
        const firma = document.getElementById('kontakt-firma').value;
        const adresse = document.getElementById('kontakt-adresse').value;

        fetch('http://localhost:3000/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            geschlecht: geschlecht,
            vorname: vorname,
            nachname: nachname,
            email: email,
            nummer: nummer,
            firma: firma,
            adresse: adresse
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
          alert('Kontakt erfolgreich erstellt!');
          closePopup(neuerKontaktPopup);
          window.location.href = '/kontakt-datenbank.html';
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Fehler beim Erstellen des Kontakts.');
        });
      });
    });
