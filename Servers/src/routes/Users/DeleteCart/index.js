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
const ReadTokenData_1 = __importDefault(require("../../../controles/Token/ReadTokenData"));
const User_1 = __importDefault(require("../../../models/Users/User"));
const router = (0, express_1.Router)();
router.delete('/deletecart/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { id } = req.params;
    try {
        const data = (0, ReadTokenData_1.default)(authorization);
        const user = yield User_1.default.findById(data.id);
        if (user) {
            let carrt = user.cart.filter((e) => e.id !== id);
            yield User_1.default.findByIdAndUpdate((data.id), { cart: carrt });
            const usern = yield User_1.default.findById(data.id);
            res.status(200).json(usern === null || usern === void 0 ? void 0 : usern.cart);
        }
        else {
            res.status(404).json('user not found');
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
