const express = require('express');
const router = express.Router();
const db = require('../db');

// pobierz wszystkie książki
router.get('/', (req, res) => {
  db.all('SELECT * FROM books', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// dodaj książkę
router.post('/', (req, res) => {
  const { title, author, description, genre, quote } = req.body;
  if (!genre) {
    return res.status(400).json({ message: 'Gatunek musi zostać wybrany.' });
  }
  const finalQuote = quote || '';
  db.run(
    'INSERT INTO books (title, author, description, genre, quote) VALUES (?, ?, ?)',
    [title, author, description],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, title, author, description });
    }
  );
});

// edytuj książkę
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, description, genre, quote} = req.body;
  if (!genre) {
    return res.status(400).json({ message: 'Gatunek musi zostać wybrany.' });
  }
  const finalQuote = quote || '';
  db.run(
    'UPDATE books SET title=?, author=?, description=? genre=?, quote=? WHERE id=?',
    [title, author, description, genre, finalQuote, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// usuń książkę
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM books WHERE id=?', id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
