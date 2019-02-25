const routes = async (app) => {
  app.get('/keys/ping', async () => ({
    data: {
      message: 'pong',
      version: 'testing',
    }
  }));
};

export default routes;
