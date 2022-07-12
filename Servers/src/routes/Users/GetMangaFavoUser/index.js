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
// import passport from "passport";
const User_js_1 = __importDefault(require("../../../models/Users/User.js"));
const router = (0, express_1.Router)();
// passport.authenticate("jwt", { session: false })
router.get('/favorites/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GetByIdUser');
    const { id } = req.params;
    try {
        console.log(id);
        const user = yield User_js_1.default.findById(id, ['favorites']);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
