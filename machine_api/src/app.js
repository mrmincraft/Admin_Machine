const express = require('express');
const app = express();

// middlewares
app.use(express.json());


// routes
app.use('/v1/auth', require('./routes/auth'));
app.use('/v1/users', require('./routes/users'));
app.use('/v1/machines', require('./routes/machines'));

// gestion des erreurs simples
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
