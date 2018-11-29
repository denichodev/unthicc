const routes = async (app) => {
  app.get('/keys/ping', async () => ({
    data: {
      message: 'pong',
    }
  }));
};

export default routes;
