const fastifyOpts = {
  logger: true,
};

// Require the framework and instantiate it
const port = process.env.PORT || 3003;

const app = require('fastify')(fastifyOpts);

// Declare a route
app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await app.listen(port)
    app.log.info(`server listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start();
