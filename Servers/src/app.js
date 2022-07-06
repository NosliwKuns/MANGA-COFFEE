const express = require('express');
const routes = require('./routes/index');
require('dotenv').config();
require('./db.js');

const server = express();

server.use(express.json());

server.use('/api', routes);


server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({message});
});

module.exports = server;