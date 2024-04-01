const Fastify = require('fastify');

(async () => {
  const app = Fastify({ logger: true });

  app.get('/', async (req, res) => {
    return { hello: 'root' };
  });

  app.get('/new', async (req, res) => {
    return { hello: 'new' };
  });

  app.get('/old', async (req, res) => {
    return { hello: 'old' };
  });

  app.ready(() => {
    const tree = app.printRoutes();
    console.log(tree);
  });

  await app.listen({ port: 3000 });
})();
