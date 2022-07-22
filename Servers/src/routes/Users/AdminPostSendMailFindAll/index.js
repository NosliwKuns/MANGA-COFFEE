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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const User_js_1 = __importDefault(require("../../../models/Users/User.js"));
const index_1 = __importDefault(require("../../../controles/Token/ReadTokenData/index"));
const index_2 = __importDefault(require("../../../controles/Email/SendEmail/index"));
const index_js_1 = __importDefault(require("../../../controles/Email/Template/NotiPubliAdminFindAll/index.js"));
const router = (0, express_1.Router)();
router.post('/adminmails', passport_1.default.authenticate("jwt", { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { subject, msg, image } = req.body;
    try {
        const data = (0, index_1.default)(authorization);
        const userAdmin = yield User_js_1.default.findById(data.id);
        if (userAdmin && userAdmin.admin) {
            const template = (0, index_js_1.default)(msg, image);
            const mail = userAdmin.email;
            const correos = yield User_js_1.default.find({ email: { $not: { $regex: '.*' + mail || 'deprecated' + '.*', $options: 'i' } } }, ["email"]);
            console.log(correos);
            correos.forEach(element => {
                (0, index_2.default)(element.email, subject, template);
            });
            res.status(200).json('Se ha enviado el correo a todos los usuarios de forma exitosa');
        }
        else {
            res.status(400).json('No cuenta con autorizacion para realizar esta accion');
        }
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
