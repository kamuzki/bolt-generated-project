document.addEventListener('DOMContentLoaded', function() {
      const kontaktList = document.getElementById('kontakt-list');
      const filterInput = document.createElement('input');
      filterInput.setAttribute('type', 'text');
      filterInput.setAttribute('placeholder', 'Filter A-Z');
      filterInput.addEventListener('input', filterKontakte);
      kontaktList.parentNode.insertBefore(filterInput, kontaktList);

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

      function filterKontakte() {
        const filterValue = filterInput.value.toUpperCase();
        const items = kontaktList.getElementsByTagName('li');

        for (let i = 0; i < items.length; i++) {
          const name = items[i].getElementsByTagName('h3')[0].textContent;
          const initial = name.charAt(0).toUpperCase();

          if (initial.startsWith(filterValue)) {
            items[i].style.display = '';
          } else {
            items[i].style.display = 'none';
          }
        }
      }
    });
