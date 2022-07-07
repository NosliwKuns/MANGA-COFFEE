"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));

// read localhost from variables and ports //

/* const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
 */
// app_js_1.default.listen(port, host, () => {
//     console.log('app listening on port ' + port);
// });

var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

app_js_1.default.listen(app.get('port'), () => {
    console.log('app listening on port ');
});

// //For avoidong Heroku $PORT error
// app.get('/', function(request, response) {
//     var result = 'App is running'
//     response.send(result);
// }).listen(app.get('port'), function() {
//     console.log('App is running, server is listening on port ', app.get('port'));
// });
