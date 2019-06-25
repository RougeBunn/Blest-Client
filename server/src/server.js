require('dotenv').config();
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const blestListRouter = require('./blestList/blestList-router');

const knex = require('knex');
const express = require('express');
const app = express();
const cors = require('cors');

const { PORT, DB_URL } = require('./config');
app.use(cors());
const jsonBodyParser = express.json();

app.use(express.static(`${__dirname}/../../client/build`));

const db = knex({
  client: 'pg',
  connection: DB_URL
});

app.set('db', db);
app.use('/api/auth/', authRouter);
app.use('/api/auth/', usersRouter);
app.use('/api/auth/', blestListRouter);

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);

module.exports = { app };
