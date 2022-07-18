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
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, mangaId } = req.query;

    try {
        const user = yield User_js_1.default.findById(id);
        const deleted = yield user.favorites.filter((m) => m !== mangaId);
        yield User_js_1.default.findByIdAndUpdate({ _id: id }, { favorites: deleted });
        const userUpdated = yield User_js_1.default.findById(id);
        res.status(200).json(userUpdated);
        // await findUser;
        // res.send(userUpdated);

    }
    catch (error) {
        res.status(500).json({ message: 'Error' });
    }
}));
exports.default = router;
