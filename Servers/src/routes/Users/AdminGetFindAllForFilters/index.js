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
const Manga_1 = __importDefault(require("../../../models/Mangas/Manga"));
const index_1 = __importDefault(require("../../../models/Products/index"));
const router = (0, express_1.Router)();
router.get('/admin', passport_1.default.authenticate("jwt", { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { type } = req.query;
    try {
        const data = (0, ReadTokenData_1.default)(authorization);
        const user = yield User_1.default.findById(data.id);
        if (user && user.admin) {
            if (type === 'mangas') {
                const filters = yield Manga_1.default.find();
                const data = [...new Set(filters.flatMap(e => e.genres))];
                res.status(200).json(data);
            }
            else if (type === 'products') {
                const filters = yield index_1.default.find();
                const filtermanga = yield Manga_1.default.find();
                const categorydata = [...new Set(filters.flatMap(e => e.category))];
                const titledata = [...new Set(filtermanga.flatMap(e => e.title))];
                const data = { category: categorydata, titles: titledata };
                res.status(200).json(data);
            }
            else {
                res.status(400).json('Opcion Invalida');
            }
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
