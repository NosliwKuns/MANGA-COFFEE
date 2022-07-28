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
const index_js_2 = __importDefault(require("../../../controles/Email/Template/ResetPass/index.js"));
const User_js_1 = __importDefault(require("../../../models/Users/User.js"));
const router = (0, express_1.Router)();
router.post('/resetpass/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_js_1.default.findOne({ email });
        if (user) {
            let template = (0, index_js_2.default)(user.users, user._id);
            (0, index_js_1.default)(email, 'cambio de contraseña', template);
            res.status(200).json('Task Failed Successfully');
        }
        else {
            res.status(200).json('Non Existent User');
        }
        ;
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
