const express = require('express');
const PORT = process.env.PORT;
const app = express();

// middlewares
app.use(express.json());

// Swagger integration
require('./swagger')(app);

// routes
app.use('/v1/auth', require('./src/routes/auth'));
app.use('/v1/users', require('./src/routes/users'));
app.use('/v1/machines', require('./src/routes/machines'));

// error handler middleware to be mouved in a separate file later
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});