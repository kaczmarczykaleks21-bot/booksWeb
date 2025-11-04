const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import tras
const booksRoutes = require('./backend/routes/books');
const usersRoutes = require('./backend/routes/users'); 



// Użyj tras
app.use('/api/books', booksRoutes);
app.use('/api', usersRoutes); 

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
