// ... (Previous server code) ...

    app.post('/protocol-items', async (req, res) => {
      const { protocol_id, date, description, type, contact_id, deadline, status, comments } = req.body;
      try {
        const result = await client.execute({
          sql: 'INSERT INTO protocol_items (protocol_id, date, description, type, contact_id, deadline, status, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          args: [protocol_id, date, description, type, contact_id, deadline, status, comments]
        });
        res.status(201).json({ id: result.lastInsertRowid, message: 'Protocol item created successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });


    // ... (Rest of the server code) ...
