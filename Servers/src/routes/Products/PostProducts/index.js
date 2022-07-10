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
const Products_js_1 = __importDefault(require("../../../models/Products/Products.js"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, image, price, stock, rating, comments } = req.body;
    try {
        if (!name || !description || !image || !price || !stock || !rating || !comments) {
            res.status(400).json({ message: 'Please fill all the fields' });
        }
        else {
            let newproduct = yield Products_js_1.default.create({ name, description, image, price, stock, rating, comments });
            res.status(200).json(newproduct);
        }
    }
    catch (error) {
        res.status(500).json("error");
    }
}));
exports.default = router;
