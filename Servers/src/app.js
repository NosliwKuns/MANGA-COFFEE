"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.IoServer = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const Passport_1 = __importDefault(require("./middlewares/Passport/Passport"));
require("./config/Mongodb/db.js");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("../node_modules/socket.io");
const server = (0, express_1.default)();
exports.server = server;
const IoServer = http_1.default.createServer(server);
exports.IoServer = IoServer;
const io = new socket_io_1.Server(IoServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    },
});
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    // socket.on('join_room', (data) => {
    //   socket.join(data);
    // })
    socket.on('send_message', (data) => {
        socket.broadcast.emit('receive_message', data);
    });
});
server.use(express_1.default.json());
//-------------------cors config--------------------//
server.use(body_parser_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(body_parser_1.default.json({ limit: '50mb' }));
server.use((0, cookie_parser_1.default)());
server.use((0, morgan_1.default)('dev'));
server.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//
server.use(passport_1.default.initialize());
passport_1.default.use(Passport_1.default);
server.use('/api', index_1.default);
server.use((0, cors_1.default)());
server.use((err, _req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send({ message });
});
