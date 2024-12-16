document.addEventListener('DOMContentLoaded', function() {
      // ... (Dropdown population logic remains the same)

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
            window.location.href = '/protokolldatenbank.html';
          })
          .catch((error) => {
            console.error('Error creating protocol item:', error);
          });
        })
        .catch((error) => {
          console.error('Error creating protocol:', error);
        });
      });
    });
