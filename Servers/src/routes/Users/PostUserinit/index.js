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
const User_1 = __importDefault(require("../../../models/Users/User"));
const index_1 = __importDefault(require("../../../controles/Token/CreatedToken/index"));
const router = (0, express_1.Router)();
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json("Por favor, llenar todos los campos");
        }
        ;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json("Usuario inexistente");
        }
        ;
        const istmach = yield user.comparePassword(password);
        if (istmach) {
            return res.status(200).json({ token: (0, index_1.default)(user), usuario: user });
        }
        if (email === password) {
            return res.status(400).json("Inicie secion con su correo y contraseña");
        }
        return res.status(400).json("Informacion no coincide");
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
