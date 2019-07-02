require('dotenv').config();
const { NODE_ENV } = require('./config');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const blestListRouter = require('./blestList/blestList-router');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const knex = require('knex');

const app = express();

const { PORT, DB_URL } = require('./config');

app.use(
  morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
  })
);
app.use(cors());
app.use(helmet());

const jsonBodyParser = express.json();

app.use(express.static(`${__dirname}/../../client/build`));

const db = knex({
  client: 'pg',
  connection: DB_URL
});

app.set('db', db);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
//app.use('/api/auth', blestListRouter);

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

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);

module.exports = { app };
