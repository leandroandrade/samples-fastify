const Fastify = require('fastify');
const { deepEqual } = require('node:assert/strict');

(async () => {
  const app = Fastify();

  app.get('/', async (req, res) => {
    const { ids } = req.query;
    return { ids };
  });

  await app.listen({ port: 3000 });

  const res = await app.inject({
    method: 'GET',
    url: '/?ids=foo&ids=bar',
  });

  deepEqual(res.statusCode, 200);
  deepEqual(res.json(), { ids: ['foo', 'bar'] });

  await app.close();
})();
