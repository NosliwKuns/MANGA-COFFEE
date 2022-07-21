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
const index_1 = __importDefault(require("../../../controles/Token/ReadTokenData/index"));
const router = (0, express_1.Router)();
router.put('/swichtstatus/:id', passport_1.default.authenticate("jwt", { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { id } = req.params;
    try {
        const data = (0, index_1.default)(authorization);
        const user = yield User_js_1.default.findById(data.id);
        if (user && user.admin) {
            const user = yield User_js_1.default.findById(id);
            if (user && user.status) {
                yield User_js_1.default.findByIdAndUpdate((id), { status: false });
            }
            else {
                yield User_js_1.default.findByIdAndUpdate((id), { status: true });
            }
            res.status(200).json();
        }
        else {
            res.status(400).json('No cuenta con autorizacion para realizar esta accion');
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
