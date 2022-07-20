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
const index_js_1 = __importDefault(require("../../../controles/Email/SendEmail/index.js"));
const index_js_2 = __importDefault(require("../../../controles/Email/Template/bienvenida/index.js"));
const index_js_3 = __importDefault(require("../../../controles/Email/Template/confirCuenta/index.js"));
const index_js_4 = __importDefault(require("../../../controles/Email/Template/RecuperarCuenta/index.js"));
const index_js_5 = __importDefault(require("../../../controles/Token/CreatedToken/index.js"));
const User_js_1 = __importDefault(require("../../../models/Users/User.js"));
const router = (0, express_1.Router)();
router.put('/resetuser/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { users, email, password, verificated, name, lastname, user_image, user_banner, user_description, telephone, address, historyBuy, favorites, wishlist, continuar } = req.body;
    try {
        if (continuar) {
            const user = yield User_js_1.default.findOne({ email });
            let template = (0, index_js_4.default)(user.users, user.id);
            (0, index_js_1.default)(email, 'Recuperar cuenta', template);
            res.status(201).json('Confirmar solicitud desde el correo electronico');
        }
        else {
            const user = yield User_js_1.default.findOne({ email });
            let mail = user.email + '_deprecated';
            yield User_js_1.default.findByIdAndUpdate({ _id: user.id }, { email: mail });
            let newuser = new User_js_1.default({ users, email, password, verificated, name, lastname, user_image, user_banner, user_description, telephone, address, historyBuy, favorites, wishlist });
            const token = (0, index_js_5.default)(newuser);
            newuser = yield newuser.save();
            let template;
            if (newuser.verificated) {
                template = (0, index_js_2.default)(users);
                (0, index_js_1.default)(email, 'Mensaje de Bienvenida', template);
            }
            else {
                template = (0, index_js_3.default)(users, newuser._id);
                (0, index_js_1.default)(email, 'Confirmacion de cuenta', template);
            }
            res.status(201).json({ token, usuario: newuser });
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
