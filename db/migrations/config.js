const DEFAULT_CONFIG = {
  driver: 'rethinkdbdash',
  db: process.env.NODE_ENV === 'test' ? 'testing' : 'unthicc',
  host: '0.0.0.0',
  port: 28015,
  migrationsDirectory: 'db/migrations',
};

module.exports = DEFAULT_CONFIG;
