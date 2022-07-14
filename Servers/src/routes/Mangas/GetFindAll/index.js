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
const Manga_js_1 = __importDefault(require("../../../models/Mangas/Manga.js"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;
        const search = req.query.search || '';
        let sort = req.query.sort || 'title';
        let genres = req.query.genres || 'All';
        const filters = yield Manga_js_1.default.find();
        const data = filters.flatMap(e => e.genres);
        const dataArr = new Set(data);
        const genresOptions = [...dataArr];
        genres === 'All'
            ? (genres = [...genresOptions])
            : (genres = req.query.genres.split(','));
        req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort]);
        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        }
        else {
            sortBy[sort[0]] = 'asc';
        }
        const mangas = yield Manga_js_1.default.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } })
            .where('genres')
            .in([...genres])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);
        console.log(mangas, 'hola');
        const total = yield Manga_js_1.default.countDocuments({
            genres: { $in: [...genres] },
            title: { $regex: search, $options: 'i' },
        });
        const response = {
            error: false,
            total,
            page: page + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            genres: genresOptions,
            mangas,
        };
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
