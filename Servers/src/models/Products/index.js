"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ProductSchema = new Schema({
    id_User: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: [Number],
        enum: [1, 2, 3, 4, 5]
    },
    comments: {
        type: [{ name: String, body: String }],
        created_at: { type: Date, required: true, default: Date.now }
    },
    stock: {
        type: Number,
        required: true
    }
});
const Product = mongoose_1.default.model('Product', ProductSchema);
exports.default = Product;
// esto lo borro despues
