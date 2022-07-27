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
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("../../../models/Users/User"));
const index_1 = __importDefault(require("../../../models/Products/index"));
const router = (0, express_1.Router)();
router.post("/addtocart/:_id", passport_1.default.authenticate("jwt", { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    const { _id, cuantity } = req.body;
    console.log(_id, id);
    try {
        const Usuarios = yield User_1.default.findById(id);
        const Productos = yield index_1.default.findById(_id);
        if (!Usuarios.cart.includes(Productos.id)) {
            Usuarios.cart.push({ _id, cuantity });
            yield Usuarios.save();
            res.status(200).send(Usuarios.cart);
        }
        else {
            res.status(200).send("this item is allredy in the cart");
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//
