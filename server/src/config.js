module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  // DB_URL: process.env.DB_URL || 'postgresql://postgres@localhost/blest-server',
  DB_URL:
    process.env.DATABASE_URL ||
    'postgresql://postgresql@localhost/blest-server',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
};
