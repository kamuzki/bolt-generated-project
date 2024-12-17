document.addEventListener('DOMContentLoaded', function() {
      const benutzerList = document.getElementById('benutzer-list');
      const filterInput = document.createElement('input');
      filterInput.setAttribute('type', 'text');
      filterInput.setAttribute('placeholder', 'Filter A-Z');
      filterInput.style.padding = '10px';
      filterInput.style.marginBottom = '20px';
      filterInput.style.border = '1px solid #ddd';
      filterInput.style.borderRadius = '10px';
      filterInput.style.fontSize = '1rem';
      filterInput.addEventListener('input', filterBenutzer);
      benutzerList.parentNode.insertBefore(filterInput, benutzerList);

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

      function filterBenutzer() {
        const filterValue = filterInput.value.toUpperCase();
        const items = benutzerList.getElementsByTagName('li');

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
