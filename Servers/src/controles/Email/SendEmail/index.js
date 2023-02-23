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
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (email, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const accessToken = mail_rover();
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config_1.default.MAIL,
                pass: 'cdvgdwfbaaictftr',
            },
        });
        const mailoptions = {
            from: `Manga-Coffe ${config_1.default.MAIL}`,
            to: email,
            subject: subject,
            html: html,
        };
        const respons = yield transporter.sendMail(mailoptions);
        return respons;
    }
    catch (error) {
        console.log("Oh no!! , Something went wrong with the email", error);
    }
});
exports.default = sendEmail;
