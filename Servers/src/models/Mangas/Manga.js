"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema } = mongoose_1.default;
;
const MangaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    cover_image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mangas: {
        type: [{ chapter: Number, link: [String] }],
        required: true
    },
    rating: {
        type: String,
        enum: [1, 2, 3, 4, 5]
    },
    comments: {
        type: [{ name: String, body: String, time: String }]
    }
});
MangaSchema.plugin(mongoose_paginate_v2_1.default);
const Manga = mongoose_1.default.model('Manga', MangaSchema);
exports.default = Manga;
