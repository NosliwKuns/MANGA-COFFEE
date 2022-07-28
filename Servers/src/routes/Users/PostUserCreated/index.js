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
const index_2 = __importDefault(require("../../../controles/Email/Template/confirCuenta/index"));
const index_3 = __importDefault(require("../../../controles/Email/SendEmail/index"));
const bienvenida_1 = __importDefault(require("../../../controles/Email/Template/bienvenida"));
const router = (0, express_1.Router)();
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { users, email, password, verificated, name, lastname, user_image, user_banner, user_description, telephone, address, historyBuy, favorites, wishlist } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!email || !password) {
            res.status(200).json("You must fill out all fields");
        }
        else if (user && !user.status) {
            res.status(200).json("An Account with thid email already exist, do you want get it back?");
        }
        else if (user && user.status) {
            res.status(200).json("Existing User");
        }
        else {
            let newuser = new User_1.default({ users, email, password, verificated, name, lastname, user_image, user_banner, user_description, telephone, address, historyBuy, favorites, wishlist });
            const token = (0, index_1.default)(newuser);
            newuser = yield newuser.save();
            let template;
            if (newuser.verificated) {
                template = (0, bienvenida_1.default)(users);
                (0, index_3.default)(email, 'Welcome to MangaCoffee', template);
            }
            else {
                template = (0, index_2.default)(users, newuser._id);
                (0, index_3.default)(email, 'Accaunt Confirmation', template);
            }
            res.status(201).json({ token, usuario: newuser });
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
