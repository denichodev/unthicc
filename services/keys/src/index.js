import createApp from './createApp';

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const app = createApp();

// Run the server!
const start = async () => {
  try {
    await app.listen(port, host);

    console.log(`server listening on ${app.server.address().port}`);
    app.log.info(`server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
