const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./books.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    pages TEXT,
    description TEXT
  )`);
});

module.exports = db;
