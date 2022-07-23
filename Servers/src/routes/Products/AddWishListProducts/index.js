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
router.post("/addToWishlist/:_id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const { productsId } = req.body;
    try {
        const Usuarios = yield User_1.default.findOne({ _id: _id });
        const Productos = yield index_1.default.findById({ _id: productsId });
        if (!Usuarios.wishlist.includes(Productos._id)) {
            Usuarios.wishlist.push(Productos);
            const user = yield User_1.default.findById(_id);
            res.status(200).json(user);
            // await Usuarios.save();
            // res.status(200).send("producto agregado a la wishlist");
        }
        else {
            res.status(200).send("el producto ya esta en la lista de deseos");
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
