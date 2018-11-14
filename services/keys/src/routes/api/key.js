const routes = async (app, options) => {
  app.get('/keys', async (req, res) => {
    return { hello: 'keys!!' };
  });

  app.get('/key/:id', async (req, res) => {
    console.log(req.params);

    return { hello: 'keys params!!!' };
  });
};

export default routes;
