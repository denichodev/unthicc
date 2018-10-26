const fastifyOpts = {
  logger: true,
};

// Require the framework and instantiate it
console.log(process.env.PORT);
const port = process.env.PORT || 3000;

const app = require('fastify')(fastifyOpts);

// Declare a route
app.get('/', async (request, reply) => {
    app.log.info(`request coming in`)

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
