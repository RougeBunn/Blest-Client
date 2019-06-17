require('dotenv').config();

const knex = require('knex');
const express = require('express');
const app = express();
const cors = require('cors');

const { PORT, DB_URL } = require('./config');
app.use(cors());

const db = knex({
  client: 'pg',
  connection: DB_URL
});

app.set('db', db);

app.get('/api/*', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };
