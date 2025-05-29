import path from 'path';
import { fileURLToPath } from 'url';
import fastifyView from '@fastify/view';
import Pug from 'pug';
import i18next from 'i18next';
import getHelpers from './helpers/index.js';

import ru from './locales/ru.js';
import en from './locales/en.js';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

const setupLocalization = async () => {
  await i18next
    .init({
      lng: 'en',
      fallbackLng: 'ru',
      // debug: isDevelopment,
      resources: {
        ru,
        en,
      },
    });
};

const setUpViews = (app) => {
  const helpers = getHelpers(app);
  app.register(fastifyView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    defaultContext: {
      ...helpers,
      assetPath: (filename) => `/assets/${filename}`,
    },
    templates: path.join(__dirname, '..', 'server', 'views'),
  });

  // app.decorateReply('render', function render(viewPath, locals) {
  //   this.view(viewPath, { ...locals, reply: this });
  // });
};

export default async (app, _options) => {
  await setupLocalization();
  setUpViews(app);

  app
    .get('/', { name: 'root' }, (req, reply) => {
      reply.view('/header')
    })

  return app;
};