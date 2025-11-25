const Database = require('better-sqlite3');
const db = new Database('database.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    description TEXT,
    genre TEXT,
    quote TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    password TEXT
  )
`).run();


function seedBooks() {
  const count = db.prepare('SELECT COUNT(*) AS count FROM books').get().count;

  if (count === 0) {
    const insert = db.prepare(
      'INSERT INTO books (title, author, description, genre, quote) VALUES (?, ?, ?, ?, ?)'
    );

    const books = [
      ['Harry Potter', 'J.K. Rowling', 'Historia młodego czarodzieja', 'Fantasy', 'Nigdy nie odmawiaj przyjaźni.'],
      ['Wiedźmin', 'Andrzej Sapkowski', 'Przygody Geralta z Rivii', 'Fantasy', 'Lepiej umrzeć niż zdradzić honor.'],
      ['Mistrz i Małgorzata', 'Michaił Bułhakow', 'Historia szatana w Moskwie', 'Fikcja', 'Prawda zawsze zwycięża.']
    ];

    const insertMany = db.transaction((books) => {
      for (const book of books) insert.run(...book);
    });

    insertMany(books);
    console.log('Dane startowe wstawione do tabeli books.');
  } else {
    console.log('Tabela books już zawiera dane.');
  }
}

seedBooks();

module.exports = db;
