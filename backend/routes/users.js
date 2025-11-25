const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const db = require('../db');


router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Wszystkie pola są wymagane!' });
  }

  try {
    const checkStmt = db.prepare('SELECT * FROM users WHERE username = ? OR email = ?');
    const exists = checkStmt.get(username, email);

    if (exists) {
      return res.status(400).json({ message: 'Użytkownik już istnieje!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertStmt = db.prepare(
      'INSERT INTO users (email, username, password) VALUES (?, ?, ?)'
    );

    insertStmt.run(email, username, hashedPassword);

    res.json({ message: 'Rejestracja zakończona sukcesem!' });

  } catch (err) {
    res.status(500).json({ message: 'Błąd serwera: ' + err.message });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Podaj login i hasło!' });
  }

  try {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    const user = stmt.get(username);

    if (!user) {
      return res.status(400).json({ message: 'Nie znaleziono użytkownika.' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: 'Niepoprawne hasło!' });
    }

    res.json({ message: `Zalogowano jako ${username}` });

  } catch (err) {
    res.status(500).json({ message: 'Błąd serwera: ' + err.message });
  }
});


module.exports = router;
