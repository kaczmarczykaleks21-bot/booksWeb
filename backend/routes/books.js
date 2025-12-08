const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const db = require('../db');


router.get('/', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM books');
    const rows = stmt.all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', (req, res) => {
  try {
    const { title, author, description, genre, quote } = req.body;

    if (!genre) {
      return res.status(400).json({ message: 'Gatunek musi zostać wybrany!' });
    }

    const stmt = db.prepare(
      'INSERT INTO books (title, author, description, genre, quote) VALUES (?, ?, ?, ?, ?)'
    );

    const result = stmt.run(title, author, description, genre, quote || '');

    res.json({
      id: result.lastInsertRowid,
      title,
      author,
      description,
      genre,
      quote: quote || ''
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, genre, quote } = req.body;

    if (!genre) {
      return res.status(400).json({ message: 'Gatunek musi zostać wybrany!' });
    }

    const stmt = db.prepare(
      'UPDATE books SET title=?, author=?, description=?, genre=?, quote=? WHERE id=?'
    );

    const result = stmt.run(title, author, description, genre, quote || '', id);

    res.json({ updated: result.changes });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const stmt = db.prepare('DELETE FROM books WHERE id=?');
    const result = stmt.run(id);

    res.json({ deleted: result.changes });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
