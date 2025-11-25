'use strict';

const express = require('express');
const path = require('path');
const app = express();

const booksRoutes = require('./backend/routes/books');
const usersRoutes = require('./backend/routes/users');

app.use(express.json());


app.use('/api/books', booksRoutes);
app.use('/api', usersRoutes);


app.use(express.static(path.join(__dirname, 'public')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server działa na porcie ${PORT}`));
