
    const express = require('express');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const { createClient } = require('@libsql/client');
    const pdfMake = require('pdfmake');
    const fs = require('fs');

    const app = express();
    const port = 3000;

    app.use(cors());
    app.use(bodyParser.json());

    const client = createClient({
      url: 'file:./bauprotokolle.db'
    });

    async function initializeDatabase() {
      await client.execute(`
        CREATE TABLE IF NOT EXISTS projects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          projektname TEXT NOT NULL,
          strasse TEXT NOT NULL,
          hausnummer TEXT NOT NULL,
          plz TEXT NOT NULL,
          ort TEXT NOT NULL,
          land TEXT NOT NULL
        )
      `);

      await client.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          role TEXT NOT NULL
        )
      `);

      await client.execute(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          geschlecht TEXT,
          vorname TEXT NOT NULL,
          nachname TEXT NOT NULL,
          email TEXT NOT NULL,
          nummer TEXT NOT NULL,
          firma TEXT,
          adresse TEXT
        )
      `);

      await client.execute(`
        CREATE TABLE IF NOT EXISTS protocols (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          project_id INTEGER NOT NULL,
          date TEXT NOT NULL,
          FOREIGN KEY (project_id) REFERENCES projects(id)
        )
      `);

      await client.execute(`
        CREATE TABLE IF NOT EXISTS protocol_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          protocol_id INTEGER NOT NULL,
          description TEXT NOT NULL,
          type TEXT NOT NULL,
          contact_id INTEGER,
          deadline TEXT,
          status TEXT,
          comments TEXT,
          FOREIGN KEY (protocol_id) REFERENCES protocols(id),
          FOREIGN KEY (contact_id) REFERENCES contacts(id)
        )
      `);
    }

    initializeDatabase();

    app.get('/projects', async (req, res) => {
      try {
        const result = await client.execute('SELECT * FROM projects');
        res.json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post('/projects', async (req, res) => {
      const { projektname, strasse, hausnummer, plz, ort, land } = req.body;
      try {
        const result = await client.execute({
          sql: 'INSERT INTO projects (projektname, strasse, hausnummer, plz, ort, land) VALUES (?, ?, ?, ?, ?, ?)',
          args: [projektname, strasse, hausnummer, plz, ort, land]
        });
        res.status(201).json({ id: result.lastInsertRowid, message: 'Project created successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.put('/projects/:id', async (req, res) => {
      const { id } = req.params;
      const { projektname, strasse, hausnummer, plz, ort, land } = req.body;
      try {
        await client.execute({
          sql: 'UPDATE projects SET projektname = ?, strasse = ?, hausnummer = ?, plz = ?, ort = ?, land = ? WHERE id = ?',
          args: [projektname, strasse, hausnummer, plz, ort, land, id]
        });
        res.json({ message: 'Project updated successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.delete('/projects/:id', async (req, res) => {
      const { id } = req.params;
      try {
        await client.execute({
          sql: 'DELETE FROM projects WHERE id = ?',
          args: [id]
        });
        res.json({ message: 'Project deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get('/users', async (req, res) => {
      try {
        const result = await client.execute('SELECT * FROM users');
        res.json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post('/users', async (req, res) => {
      const { username, password, role } = req.body;
      try {
        const result = await client.execute({
          sql: 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
          args: [username, password, role]
        });
        res.status(201).json({ id: result.lastInsertRowid, message: 'User created successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.put('/users/:id', async (req, res) => {
      const { id } = req.params;
      const { username, password, role } = req.body;
      try {
        await client.execute({
          sql: 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?',
          args: [username, password, role, id]
        });
        res.json({ message: 'User updated successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.delete('/users/:id', async (req, res) => {
      const { id } = req.params;
      try {
        await client.execute({
          sql: 'DELETE FROM users WHERE id = ?',
          args: [id]
        });
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get('/contacts', async (req, res) => {
      try {
        const result = await client.execute('SELECT * FROM contacts');
        res.json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post('/contacts', async (req, res) => {
      const { geschlecht, vorname, nachname, email, nummer, firma, adresse } = req.body;
      try {
        const result = await client.execute({
          sql: 'INSERT INTO contacts (geschlecht, vorname, nachname, email, nummer, firma, adresse) VALUES (?, ?, ?, ?, ?, ?, ?)',
          args: [geschlecht, vorname, nachname, email, nummer, firma, adresse]
        });
        res.status(201).json({ id: result.lastInsertRowid, message: 'Contact created successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.put('/contacts/:id', async (req, res) => {
      const { id } = req.params;
      const { geschlecht, vorname, nachname, email, nummer, firma, adresse } = req.body;
      try {
        await client.execute({
          sql: 'UPDATE contacts SET geschlecht = ?, vorname = ?, nachname = ?, email = ?, nummer = ?, firma = ?, adresse = ? WHERE id = ?',
          args: [geschlecht, vorname, nachname, email, nummer, firma, adresse, id]
        });
        res.json({ message: 'Contact updated successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.delete('/contacts/:id', async (req, res) => {
      const { id } = req.params;
      try {
        await client.execute({
          sql: 'DELETE FROM contacts WHERE id = ?',
          args: [id]
        });
        res.json({ message: 'Contact deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get('/protocols', async (req, res) => {
      try {
        const result = await client.execute('SELECT * FROM protocols');
        res.json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post('/protocols', async (req, res) => {
      const { project_id, date } = req.body;
      try {
        const result = await client.execute({
          sql: 'INSERT INTO protocols (project_id, date) VALUES (?, ?)',
          args: [project_id, date]
        });
        res.status(201).json({ id: result.lastInsertRowid, message: 'Protocol created successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get('/protocol-items', async (req, res) => {
      try {
        const result = await client.execute('SELECT * FROM protocol_items');
        res.json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post('/protocol-items', async (req, res) => {
      const { protocol_id, description, type, contact_id, deadline, status, comments } = req.body;
      try {
        const result = await client.execute({
          sql: 'INSERT INTO protocol_items (protocol_id, description, type, contact_id, deadline, status, comments) VALUES (?, ?, ?, ?, ?, ?, ?)',
          args: [protocol_id, description, type, contact_id, deadline, status, comments]
        });
        res.status(201).json({ id: result.lastInsertRowid, message: 'Protocol item created successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.put('/protocol-items/:id', async (req, res) => {
      const { id } = req.params;
      const { description, type, contact_id, deadline, status, comments } = req.body;
      try {
        await client.execute({
          sql: 'UPDATE protocol_items SET description = ?, type = ?, contact_id = ?, deadline = ?, status = ?, comments = ? WHERE id = ?',
          args: [description, type, contact_id, deadline, status, comments, id]
        });
        res.json({ message: 'Protocol item updated successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.delete('/protocol-items/:id', async (req, res) => {
      const { id } = req.params;
      try {
        await client.execute({
          sql: 'DELETE FROM protocol_items WHERE id = ?',
          args: [id]
        });
        res.json({ message: 'Protocol item deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post('/generate-pdf', async (req, res) => {
      const { protocolId } = req.body;

      try {
        const protocolResult = await client.execute({
          sql: 'SELECT p.id, p.date, pr.projektname FROM protocols p JOIN projects pr ON p.project_id = pr.id WHERE p.id = ?',
          args: [protocolId]
        });
        const protocol = protocolResult.rows[0];

        const itemsResult = await client.execute({
          sql: 'SELECT pi.description, pi.type, c.vorname, c.nachname, pi.deadline, pi.status, pi.comments FROM protocol_items pi LEFT JOIN contacts c ON pi.contact_id = c.id WHERE pi.protocol_id = ?',
          args: [protocolId]
        });
        const items = itemsResult.rows;

        const docDefinition = {
          content: [
            { text: `Protokoll für Projekt: ${protocol.projektname}`, style: 'header' },
            { text: `Datum: ${protocol.date}`, style: 'subheader' },
            {
              table: {
                body: [
                  [
                    { text: 'Beschreibung', style: 'tableHeader' },
                    { text: 'Typ', style: 'tableHeader' },
                    { text: 'Zuständig', style: 'tableHeader' },
                    { text: 'Frist', style: 'tableHeader' },
                    { text: 'Status', style: 'tableHeader' },
                    { text: 'Kommentare', style: 'tableHeader' }
                  ],
                  ...items.map(item => [
                    item.description,
                    item.type,
                    item.vorname ? `${item.vorname} ${item.nachname}` : 'Nicht zugewiesen',
                    item.deadline || 'Keine Frist',
                    item.status || 'Offen',
                    item.comments || ''
                  ])
                ]
              }
            }
          ],
          styles: {
            header: {
              fontSize: 22,
              bold: true,
              margin: [0, 0, 0, 20]
            },
            subheader: {
              fontSize: 16,
              margin: [0, 0, 0, 10]
            },
            tableHeader: {
              bold: true,
              fontSize: 12,
              fillColor: '#f0f0f0'
            }
          }
        };

        const pdfDoc = new pdfMake({
          Roboto: {
            normal: new Buffer(fs.readFileSync('./Roboto-Regular.ttf')).toString('base64'),
            bold: new Buffer(fs.readFileSync('./Roboto-Bold.ttf')).toString('base64'),
            italics: new Buffer(fs.readFileSync('./Roboto-Italic.ttf')).toString('base64'),
            bolditalics: new Buffer(fs.readFileSync('./Roboto-BoldItalic.ttf')).toString('base64')
          }
        }).createPdfKitDocument(docDefinition);

        const chunks = [];
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => {
          const pdfData = Buffer.concat(chunks);
          res.setHeader('Content-Type', 'application/pdf');
          res.send(pdfData);
        });
        pdfDoc.end();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.listen(port, () => {
      console.log(`Server running on