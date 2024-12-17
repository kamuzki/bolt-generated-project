document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('neues-protokoll-form');
      const projectSelect = document.getElementById('project_id');
      const contactSelect = document.getElementById('contact_id');

      // Fetch projects and populate the dropdown
      fetch('http://localhost:3000/projects')
        .then(response => response.json())
        .then(projects => {
          projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.text = project.projektname;
            projectSelect.appendChild(option);
          });
        })
        .catch(error => console.error('Error fetching projects:', error));

      // Fetch contacts and populate the dropdown
      fetch('http://localhost:3000/contacts')
        .then(response => response.json())
        .then(contacts => {
          contacts.forEach(contact => {
            const option = document.createElement('option');
            option.value = contact.id;
            option.text = `${contact.vorname} ${contact.nachname}`;
            contactSelect.appendChild(option);
          });
        })
        .catch(error => console.error('Error fetching contacts:', error));

      form.addEventListener('submit', function(event) {
        event.preventDefault();

        const project_id = document.getElementById('project_id').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        const type = document.getElementById('type').value;
        const contact_id = document.getElementById('contact_id').value;
        const deadline = document.getElementById('deadline').value;
        const status = document.getElementById('status').value;
        const comments = document.getElementById('comments').value;

        // First, create a new protocol entry
        fetch('http://localhost:3000/protocols', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ project_id: project_id, date: date }),
        })
        .then(response => response.json())
        .then(protocolData => {
          // Then, create the protocol item with the correct protocol_id
          const protocol_id = protocolData.id; // Get the ID of the newly created protocol

          fetch('http://localhost:3000/protocol-items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              protocol_id: protocol_id, // Use the correct protocol_id
              date: date,
              description: description,
              type: type,
              contact_id: contact_id,
              deadline: deadline,
              status: status,
              comments: comments
            }),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            alert('Protokollpunkt erfolgreich erstellt!');
            window.location.href = '/protokolldatenbank.html';
          })
          .catch((error) => {
            console.error('Error creating protocol item:', error);
            alert('Fehler beim Erstellen des Protokollpunkts.');
          });
        })
        .catch((error) => {
          console.error('Error creating protocol:', error);
          alert('Fehler beim Erstellen des Protokolls.');
        });
      });
    });
