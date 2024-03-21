const Fastify = require('fastify');

(async () => {
  const app = Fastify({
    logger: {
      level: 'info',
      serializers: {
        req: (request) => ({
          method: request.raw.method,
          url: request.raw.url,
          hostname: request.hostname,
        }),
        res: (response) => ({
          statusCode: response.statusCode,
        }),
      },
    },
  });

  app.get('/', async (req, res) => {
    return { hello: 'world' };
  });

  await app.listen({ port: 3000 });
})();

// curl -H 'x-log-level: error' http://localhost:3000
