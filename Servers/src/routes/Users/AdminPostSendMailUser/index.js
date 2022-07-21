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
const index_js_1 = __importDefault(require("../../../controles/Email/SendEmail/index.js"));
const index_js_2 = __importDefault(require("../../../controles/Email/Template/NotificacionesAdmin/index.js"));
const router = (0, express_1.Router)();
router.post('/sendadminnoti/:id', passport_1.default.authenticate("jwt", { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { asunto, image } = req.body;
    try {
        const data = (0, index_1.default)(authorization);
        const userAdmin = yield User_js_1.default.findById(data.id);
        if (userAdmin && userAdmin.admin) {
            const user = yield User_js_1.default.findById(id);
            const template = (0, index_js_2.default)(image);
            if (user) {
                (0, index_js_1.default)((user.email), asunto, template);
                res.status(200).json('Correo enviado correctamente');
            }
            else {
                res.status(400).json('Error: usuario no identificado');
            }
        }
        else {
            res.status(400).json('No cuenta con autorizacion para realizar esta accion');
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
