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
const Manga_js_1 = __importDefault(require("../../../models/Manga.js"));
const router = (0, express_1.Router)();
router.get('/genres', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { genres } = req.body;
    let generos = [];
    let unicos = [];
    try {
        for (let i = 0; i < genres.length; i++) {
            const filters = yield Manga_js_1.default.find({ genres: genres[i] }, ["title", "image_backgraund", "genres"]);
            generos.push(filters);
        }
        for (let j = 0; j < generos.length; j++) {
            let contador = 0;
            for (let c = 1; c < unicos.length; c++) {
                contador = c;
                if (unicos[c]._id === generos[j]._id) {
                    return;
                }
            }
            if (contador === unicos.length) {
                unicos.push(generos[j]);
            }
        }
        res.status(200).json(unicos);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
