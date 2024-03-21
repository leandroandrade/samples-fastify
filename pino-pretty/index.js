const Fastify = require('fastify');

(async () => {
  const opts = {
    logger: {
      level: 'debug',
    },
  };

  if (process.stdout.isTTY) {
    opts.logger.transport = { target: 'pino-pretty' };
  }

  const app = Fastify(opts);

  app.get('/', async (req, res) => {
    return { hello: 'world' };
  });

  await app.listen({ port: 3000 });
})();

// curl -H 'x-log-level: error' http://localhost:3000
