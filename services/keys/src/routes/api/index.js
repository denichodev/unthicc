import key from './key';

const routes = async (app, options) => {
  app.register(key);
};

export default routes;
