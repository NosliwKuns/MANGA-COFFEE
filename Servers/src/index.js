"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));

// read localhost from variables and ports

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app_js_1.default.listen(port, host, () => {
    console.log('app listening on port ' + port);
});
