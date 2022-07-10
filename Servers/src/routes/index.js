"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./Mangas/GetByName/index"));
const index_2 = __importDefault(require("./Mangas/PostManga/index"));
const index_3 = __importDefault(require("./Mangas/GetFindAll/index"));
const index_4 = __importDefault(require("./Mangas/GetById/index"));
const index_5 = __importDefault(require("./Mangas/DeleteById/index"));
const index_6 = __importDefault(require("./Mangas/FilterByGenre/index"));
const index_7 = __importDefault(require("./Users/PostUserCreated/index"));
const index_8 = __importDefault(require("./Users/PostUserinit/index"));
const index_9 = __importDefault(require("./Users/GetByIdUser/index"));
const index_10 = __importDefault(require("./Users/PutByIdUser/index"));
const index_11 = __importDefault(require("./Users/PutByIdUserFav/index"));

const router = (0, express_1.Router)();
router.use('/manga', index_6.default);
router.use('/manga', index_3.default);
router.use('/manga', index_1.default);
router.use('/manga', index_4.default);
router.use('/manga', index_2.default);
router.use('/manga', index_5.default);
router.use('/user', index_7.default);
router.use('/user', index_8.default);
router.use('/user', index_9.default);
router.use('/user', index_10.default);
router.use('/user', index_11.default);

exports.default = router;
