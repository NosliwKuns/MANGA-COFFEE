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
const index_1 = __importDefault(require("../../../models/Products/index"));
const router = (0, express_1.Router)();
router.post('/comments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const newcomments = req.body;
    try {
        let product = yield index_1.default.findById(id);
        if (product) {
            product.comments.push(newcomments);
            yield product.save(newcomments);
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Product not foundh' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error' });
    }
}));
exports.default = router;
