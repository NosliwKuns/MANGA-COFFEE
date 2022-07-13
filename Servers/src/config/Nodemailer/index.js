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
const googleapis_1 = require("googleapis");
const config_1 = __importDefault(require("../ConfigEntorno/config"));
const mail_rover = () => __awaiter(void 0, void 0, void 0, function* () {
    const oAuth2Client = new googleapis_1.google.auth.OAuth2(config_1.default.CLIENTD_ID, config_1.default.CLIENTD_SECRET, config_1.default.URI_REDIRECT);
    oAuth2Client.setCredentials({ refresh_token: config_1.default.CLIENTD_REFRESHTOKEN });
    const accessToken = yield oAuth2Client.getAccessToken();
    return accessToken;
});
exports.default = mail_rover;
