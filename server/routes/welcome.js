// @ts-check

export default (app) => {
  app
    .get('/', { name: 'root' }, (req, reply) => {
      reply.view('welcome/index');
    })
    .get('/protected', { name: 'protected', preValidation: app.authenticate }, (req, reply) => {
      reply.view('welcome/index');
    });
};