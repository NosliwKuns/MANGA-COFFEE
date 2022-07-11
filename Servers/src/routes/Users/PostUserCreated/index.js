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
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { users, name, lastname, email, favorites, telephone, address, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(200).json("Por favor, llenar todos los campos");
        }
        ;
        const user = yield User_1.default.find({ email });
        if (user.length) {
            return res.status(200).json("Usuario existente");
        }
        ;
        const newuser = new User_1.default({ users, name, lastname, email, favorites, telephone, address, password });
        yield newuser.save();
        res.status(201).json({ token: crateToken(newuser), usuario: newuser });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
