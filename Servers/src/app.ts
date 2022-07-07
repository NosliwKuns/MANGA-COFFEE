import express from'express';
import routes from './routes/index';
import './db.js';


const server = express();

server.use(express.json());

server.use('/api', routes);


server.use((err:any, _req:any, res:any, _next:any) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({message});
});

export default server;