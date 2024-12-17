document.getElementById('neuer-benutzer-form').addEventListener('submit', function(event) {
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
        window.location.href = '/benutzerdatenbank.html';
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Fehler beim Erstellen des Benutzers.');
      });
    });
