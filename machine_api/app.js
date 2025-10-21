const express = require('express');
const app = express();

// middlewares
app.use(express.json());

// routes
const usersRouter = require('./routes/users');
const machinesRouter = require('./routes/machines');

app.use('/v1/users', usersRouter);
app.use('/v1/machines', machinesRouter);

// gestion des erreurs simples
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
