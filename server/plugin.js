import fastifyView from '@fastify/view';
import Pug from 'pug';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

const setUpViews = (app) => {
  app.register(fastifyView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    templates: path.join(__dirname, '..', 'server', 'views'),
  });

  // app.decorateReply('render', function render(viewPath, locals) {
  //   this.view(viewPath, { ...locals, reply: this });
  // });
};

export default (app) => {
  setUpViews(app);

  app
    .get('/', { name: 'root' }, (req, reply) => {
      reply.view('/header')
    })

  return app;
};