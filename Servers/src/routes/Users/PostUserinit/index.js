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
        const user = yield User_1.default.findOne({ email });
        if (!email || !password) {
            res.status(400).json("Por favor, llenar todos los campos");
        }
        else if (!user) {
            res.status(400).json("Usuario inexistente");
        }
        else if (!user.status) {
            res.status(400).json("Cuenta eliminada; por favor registrese de nuevo");
        }
        else if (user.block) {
            res.status(400).json("Cuenta bloqueada; si hubo un error, por favor informenos por medio de nuestro correo oficial ");
        }
        else {
            const istmach = yield user.comparePassword(password);
            if (istmach) {
                res.status(200).json({ token: (0, index_1.default)(user), usuario: user });
            }
            else if (!istmach && email === password) {
                res.status(400).json("Inicie seccion con su correo y contraseña");
            }
            else {
                res.status(400).json("Informacion no coincide");
            }
            ;
        }
    }
    catch (error) {
        next(error);
    }
    ;
}));
exports.default = router;
