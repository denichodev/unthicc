import fastify from 'fastify';
import apiRoutes from './routes/api';

const createApp = () => {
  const options = {
    logger: process.env.NODE_ENV === 'development',
  };

  const app = fastify(options);

  app.register(apiRoutes);

  return app;
};

export default createApp;
