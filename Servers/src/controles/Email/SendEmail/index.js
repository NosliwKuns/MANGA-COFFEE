"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config/ConfigEntorno/config"));
const Nodemailer_1 = __importDefault(require("../../../config/Nodemailer"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (email, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (0, Nodemailer_1.default)();
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                type: 'oauth2',
                user: config_1.default.MAIL,
                clientId: config_1.default.CLIENTD_ID,
                clientSecret: config_1.default.CLIENTD_SECRET,
                refreshToken: config_1.default.CLIENTD_REFRESHTOKEN,
                accessToken: accessToken
            }
        });
        const mailoptions = {
            from: `Manga-Coffe ${config_1.default.MAIL}`,
            to: email,
            subject: subject,
            html: html
        };
        const respons = yield transporter.sendMail(mailoptions);
        return respons;
    }
    catch (error) {
        console.log('Oh no!! , Something went wrong with the email', error);
    }
});
exports.default = sendEmail;
