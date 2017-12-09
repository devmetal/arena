const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const webpack = require('webpack');
const devMd = require('webpack-dev-middleware');
const wConf = require('../../webpack.config');
const schema = require('./schema');

module.exports = function main() {
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

  app.use('/graphql', graphqlExpress(request => ({
    schema,
    context: { request },
  })));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  const compiler = webpack(wConf);

  app.use(devMd(compiler));

  // Instead of history api fallback
  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      return res.end();
    });
  });

  return {
    app,
    Queues: app.locals.Queues
  };
};
