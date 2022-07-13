"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../ConfigEntorno/config"));
let transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 25 || 465,
    tls: {
        rejectUnauthorized: false
    },
    secure: false,
    auth: {
        user: config_1.default.mail,
        pass: config_1.default.pass,
    },
});
exports.default = transporter;
