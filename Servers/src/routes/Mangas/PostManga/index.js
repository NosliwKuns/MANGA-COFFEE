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
const fs_extra_1 = __importDefault(require("fs-extra"));
const Manga_js_1 = __importDefault(require("../../../models/Mangas/Manga.js"));
const index_js_1 = require("../../../config/Cloudinary/index.js");
const index_js_2 = require("../../../middlewares/FileUpload/index.js");
const router = (0, express_1.Router)();
router.post('/', (0, index_js_2.FilesImage)(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, genres, cover_image, description, rating, comments, chapter } = req.body;
    try {
        if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.books) {
            const { books } = req.files;
            let link = [];
            let folderpath = `Mangas/${title}/chapter${chapter}`;
            for (let i = 0; i < books.length; i++) {
                let linkClaudinary = yield (0, index_js_1.Uploadimage)(books[i].tempFilePath, folderpath);
                yield fs_extra_1.default.unlink(books[i].tempFilePath);
                link.push(linkClaudinary.secure_url);
            }
            let mangas = {
                chapter: chapter,
                link: link
            };
            const manga = new Manga_js_1.default({ title, genres, cover_image, description, mangas, rating, comments });
            let newmanga = yield manga.save();
            res.status(200).json(newmanga);
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
