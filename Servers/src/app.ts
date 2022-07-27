import express from'express';
import routes from './routes/index';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passportmiddleware from './middlewares/Passport/Passport';
import './config/Mongodb/db.js';
import cors from 'cors';
import http from 'http'
import {Server} from '../node_modules/socket.io';

const server = express();
const origin = 'http://localhost:3000' || 'https://manga-coffee.vercel.app'
const IoServer = http.createServer(server);
const io = new Server(IoServer,{
  cors:{
    origin: origin,
    methods: ['GET', 'POST']
  },
});

io.on('connection',(socket)=> {
  console.log(`User Connected: ${socket.id}`);
  
  // socket.on('join_room', (data) => {
  //   socket.join(data);
  // })
  socket.on('send_message',(data) => {
    socket.broadcast.emit('receive_message', data)
  })
})

server.use(express.json());
//-------------------cors config--------------------//
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//
server.use(passport.initialize());
passport.use(passportmiddleware);

server.use('/api', routes);
server.use(cors());

server.use((err:any, _req:any, res:any, _next:any) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({message});
});



export {IoServer ,server };
//commit prueba