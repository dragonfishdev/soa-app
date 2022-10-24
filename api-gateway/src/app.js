const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const url = require('url');
const restreamer = require('./lib/restreamer');
const proxy = require('./lib/poxy');
const services = require('../services.json');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => res.json({ message: 'API Gateway is alive' }));

// Bootstrap services
services.forEach((service) => {
  const {
    name, host, port, rootPath = '', protocol = 'http',
  } = service;

  console.log(`Boostrapping service: ${protocol}://${host}:${port}/${rootPath}`);

  let middleware = [];
  if (service.middleware) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    middleware = service.middleware.map((mw) => require(`./middleware/${mw}.middleware`));
  }

  // need to restream the request so that it can be proxied
  middleware.push(restreamer());

  app.use(`/api/${name}*`, middleware, (req, res, next) => {
    const newPath = url.parse(req.originalUrl).pathname.replace(`/api/${name}`, rootPath);
    proxy.web(req, res, { target: `${protocol}://${host}:${port}/${newPath}` }, next);
    console.log(`Forwarding request to: ${req.method} ${protocol}://${host}:${port}/${newPath}`);
  });
});

const PORT = process.env.PORT || 8080;
app.set('port', PORT);

const server = http.createServer(app);
server.listen(PORT);
