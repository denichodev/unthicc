const routes = async app => {
  app.get('/ping', async () => ({
    data: {
      message: 'pong',
      version: 'testing',
      nice: 69
    },
  }));
};

export default routes;
