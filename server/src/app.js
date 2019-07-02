require('dotenv').config();
const express = require('express');
const { NODE_ENV } = require('./config');
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

const app = express();

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: 'server error' };
  } else {
    console.error(error);
    response = { error: error.message, details: error };
  }
  res.status(500).json(response);
});

module.exports = app;
