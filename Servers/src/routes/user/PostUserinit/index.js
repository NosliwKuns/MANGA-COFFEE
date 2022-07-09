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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../../models/Users/User"));
const config_1 = __importDefault(require("../../../config/config"));
const router = (0, express_1.Router)();
function crateToken(user) {
    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.jwtsecret, {
        expiresIn: 86400
    });
}
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ msg: "Por favor, llenar todos los campos" });
        }
        ;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Ususario inexistente" });
        }
        ;
        const istmach = yield user.comparePassword(password);
        if (istmach) {
            return res.status(200).json({ token: crateToken(user), usuario: user });
        }
        ;
        return res.status(400).json({ msg: "informacion no coincide" });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
