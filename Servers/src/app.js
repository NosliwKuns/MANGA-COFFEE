const express = require('express');
const routes = require('./routes/index.js');

const server = express();

server.use(express.json());


server.use('/', routes);


server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({message});
});

module.exports = server;