"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../ConfigEntorno/config"));
mongoose_1.default.connect(config_1.default.Db)
    .then(() => console.log('database conect'))
    .catch((error) => console.log('Error database conect ', error));
