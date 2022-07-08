"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
// const PORT = process.env.PORT || 3000
// server.listen(PORT, ()=> {
//     console.log('app listening on port ' + PORT)
// })
var express = require('express');
var app = express();
const cors = require('cors');
app_js_1.default.use(cors());
app.set('port', (process.env.PORT || 5000));
app_js_1.default.listen(app.get('port'), () => {
    console.log('app listening on port ');
});
