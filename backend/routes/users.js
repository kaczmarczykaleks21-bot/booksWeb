const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');


// Rejestracja użytkownika
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Wszystkie pola są wymagane!' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
      [email, username, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ message: 'Użytkownik już istnieje!' });
          }
          return res.status(500).json({ message: 'Błąd serwera: ' + err.message });
        }

        res.json({ message: 'Rejestracja zakończona sukcesem!' });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Błąd podczas rejestracji.' });
  }
});

// Logowanie użytkownika
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Podaj login i hasło!' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Błąd bazy danych.' });
    if (!user) return res.status(400).json({ message: 'Nie znaleziono użytkownika.' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Niepoprawne hasło!' });

    res.json({ message: `Zalogowano jako ${username}` });
  });
});

module.exports = router;
