const Fastify = require('fastify');

(async () => {
  const logLevels = [
    'debug',
    'error',
    'fatal',
    'info',
    'silent',
    'trace',
    'warn',
  ];

  const app = Fastify({
    logger: {
      level: 'debug',
    },
    disableRequestLogging: true,
  });

  app.addHook('onRequest', async (req, reply) => {
    const logLevel = req.headers['x-log-level'];

    if (logLevel && logLevels.includes(logLevel.toLowerCase())) {
      req.log.level = logLevel.toLowerCase();
    }
  });

  app.get('/', async (req, res) => {
    req.log.info('should when log level is INFO');
    return { hello: 'world' };
  });

  await app.listen({ port: 3000 });
})();

// curl -H 'x-log-level: error' http://localhost:3000
