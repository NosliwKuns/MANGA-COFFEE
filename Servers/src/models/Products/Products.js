"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    stock: {
        type: [{ chapter: Number, link: [String] }],
        required: true
    },
    rating: {
        type: String,
        enum: [1, 2, 3, 4, 5]
    },
    comments: {
        type: [{ name: String, body: String }]
    }
});
const Products = mongoose_1.default.model('Products', ProductsSchema);
exports.default = Products;
