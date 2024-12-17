document.addEventListener('DOMContentLoaded', function() {
      const kontaktList = document.getElementById('kontakt-list');

      fetch('http://localhost:3000/contacts')
        .then(response => response.json())
        .then(contacts => {
          contacts.forEach(contact => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <h3>${contact.vorname} ${contact.nachname}</h3>
              <p>Email: ${contact.email}</p>
              <p>Telefonnummer: ${contact.nummer}</p>
              <p>Firma: ${contact.firma}</p>
              <p>Adresse: ${contact.adresse}</p>
            `;
            kontaktList.appendChild(listItem);
          });
        })
        .catch(error => console.error('Error fetching contacts:', error));
    });
