const Fastify = require('fastify');
const { deepEqual, equal } = require('node:assert/strict');

(async () => {
  const app = Fastify();

  app.addHook('onSend', async (request, reply) => {
    reply.headers({
      'Cache-Control': 'no-store',
      Pragma: 'no-cache',
    });
  });

  await app.register(require('./custom-route'));

  app.get('/', async (req, res) => {
    return { hello: 'world' };
  });

  await app.listen({ port: 3000 });

  const res = await app.inject({
    method: 'GET',
    url: '/',
  });

  deepEqual(res.statusCode, 200);
  deepEqual(res.json(), { hello: 'world' });
  equal(res.headers['cache-control'], 'no-store');
  equal(res.headers.pragma, 'no-cache');

  const resCustom = await app.inject({
    method: 'GET',
    url: '/custom-route',
  });

  deepEqual(resCustom.statusCode, 200);
  deepEqual(resCustom.json(), { custom: 'route' });
  equal(res.headers['x-custom-header'], 'foo');

  await app.close();
})();
