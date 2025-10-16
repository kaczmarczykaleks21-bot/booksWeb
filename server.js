const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const booksRoutes = require('./backend/routes/books');
app.use('/api/books', booksRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

fetch('http://localhost:3000/api/books')
  .then(res => res.json())
  .then(data => console.log(data));

fetch('http://localhost:3000/api/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Nowa książka', author: 'Nowy autor', description: 'Opis...' })
});
