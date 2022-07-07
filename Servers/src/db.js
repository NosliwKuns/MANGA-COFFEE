"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let ruta = process.env.URI;
mongoose_1.default.connect(ruta)
    .then(() => console.log('database conect'))
    .catch((error) => console.log('Error database conect ', error));
