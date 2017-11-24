const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const expressGraphql = require('express-graphql');
const webpack = require('webpack');
const devMd = require('webpack-dev-middleware');
const wConf = require('../../webpack.config');
const schema = require('./schema');

module.exports = function() {
  const hbs = exphbs.create({
    defaultLayout: `${__dirname}/views/layout`,
    handlebars,
    partialsDir: `${__dirname}/views/partials/`,
    extname: 'hbs'
  });

  require('handlebars-helpers')({handlebars});
  require('./views/helpers/handlebars')(handlebars);

  const app = express();

  const defaultConfig = require(path.join(__dirname, 'config', 'index.json'));

  const Queues = require('./queue');
  app.locals.Queues = new Queues(defaultConfig);
  app.locals.basePath = '';

  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'hbs');
  app.set('json spaces', 2);

  app.engine('hbs', hbs.engine);

  app.use(bodyParser.json());

  app.use('/graphql', expressGraphql({
    schema,
    graphiql: true,
  }));

  app.use(devMd(webpack(wConf)));

  return {
    app,
    Queues: app.locals.Queues
  };
};
