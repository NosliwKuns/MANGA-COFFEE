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
const User_js_1 = __importDefault(require("../../../models/Users/User.js"));
const router = (0, express_1.Router)();
router.put('/fav/:id', passport_1.default.authenticate("jwt", { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('PutByIdUser');
    const { id } = req.params;
    const { favorites } = req.body;
    try {
        const oldUser = yield User_js_1.default.findById(id);
        let favOld = oldUser === null || oldUser === void 0 ? void 0 : oldUser.favorites;
        let favNew;
        if (favOld) {
            favNew = favOld.concat(favorites);
        }
        else {
            favNew = favorites;
        }
        yield User_js_1.default.findByIdAndUpdate({ _id: id }, { favorites: favNew });
        const user = yield User_js_1.default.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
