import os from 'os';

const routes = async (app) => {
  app.get('/keys/ping', async () => ({
    data: {
      message: 'pong',
      version: 'testing',
      hostname: os.hostname(),
    }
  }));
};

export default routes;
