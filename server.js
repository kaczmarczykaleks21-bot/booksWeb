const express = require('express');
const path = require('path');
const app = express();

const booksRoutes = require('./backend/routes/books');
const usersRoutes = require('./backend/routes/users');

app.use(express.json());


app.use('/api/books', booksRoutes);
app.use('/api', usersRoutes);


app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log('Server działa na porcie 3000'));
