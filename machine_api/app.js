const express = require('express');
const PORT = process.env.PORT;
const app = express();

// middlewares
app.use(express.json());


// routes
app.use('/v1/auth', require('./src/routes/auth'));
app.use('/v1/users', require('./src/routes/users'));
app.use('/v1/machines', require('./src/routes/machines'));

// gestion des erreurs simples
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
