const fastifyOpts = {
  logger: true,
};

// Require the framework and instantiate it
const port = process.env.PORT || 3000;

// Require the framework and instantiate it
const fastify = require('fastify')(fastifyOpts)

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(port, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()