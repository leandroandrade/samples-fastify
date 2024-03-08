const fp = require('fastify-plugin');

module.exports = fp(async (fastify) => {
  fastify.addHook('onSend', async (request, reply) => {
    reply.headers({
      'x-custom-header': 'foo',
    });
  });

  fastify.get('/custom-route', async (req, res) => {
    return { custom: 'route' };
  });
});
