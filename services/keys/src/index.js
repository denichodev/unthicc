import fastify from 'fastify';

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';
const options = {
  logger: true
};

const app = fastify(options);

import apiRoutes from './routes/api';

app.register(apiRoutes, {
  prefix: '/api',
});

// Run the server!
const start = async () => {
  try {
    await app.listen(port, host);

    app.log.info(`server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
