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
const User_1 = __importDefault(require("../../../models/Users/User"));
const index_1 = __importDefault(require("../../../models/Products/index"));
const router = (0, express_1.Router)();
router.get('/addtocart/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let shopingCart = {};
    try {
        const Usuario = yield User_1.default.findById(id, ['cart']);
        shopingCart = yield index_1.default.paginate({ _id: Usuario.cart }, {
            limit: 12,
            select: ["name", "category", "description", "price", "product_image"],
            sort: { name: 1 }
        });
        res.status(200).json(shopingCart);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
