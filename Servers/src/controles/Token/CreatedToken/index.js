"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config/ConfigEntorno/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.jwtsecret, {
        expiresIn: '1000000000000000000000000000000000000000000000000 years'
    });
}
exports.default = createToken;
