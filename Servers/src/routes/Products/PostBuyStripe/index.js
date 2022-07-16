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
const stripe_1 = __importDefault(require("stripe"));
const passport_1 = __importDefault(require("passport"));
const ReadTokenData_1 = __importDefault(require("../../../controles/Token/ReadTokenData"));
const index_1 = __importDefault(require("../../../models/Products/index"));
const User_1 = __importDefault(require("../../../models/Users/User"));
const router = (0, express_1.Router)();
const stripe = new stripe_1.default("sk_test_51LLrJiAaJyGKFRYYchn8r6wj05opINEVucofBXXorZQWhuq1zFJ1FW3Ys134xp4FuqnQynqh7CaQ6Rhks29Fck4t00fvKC5c6E", { apiVersion: "2020-08-27" });
router.post("/checkout/:idCompra", passport_1.default.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quantity, idProduct } = req.body;
        const { idCompra } = req.params;
        const { authorization } = req.headers;
        const data = (0, ReadTokenData_1.default)(authorization);
        const product = yield index_1.default.findById(idProduct);
        if (product) {
            let stock = product.stock - quantity;
            yield index_1.default.findByIdAndUpdate((idProduct), { stock: stock });
            let amount = product.price * quantity;
            const payment = yield stripe.paymentIntents.create({
                amount: amount,
                currency: "USD",
                description: product.description,
                payment_method: idCompra,
                confirm: true,
            });
            console.log(payment);
            const compra = {
                idCompra: idCompra,
                produtcs: [{
                        idProduct: idProduct,
                        name: product.name,
                        price: product.price,
                        quantity: quantity
                    }],
                total: amount,
                // adrress:{
                //   postalCode : ,
                //   country : String,
                //   direction : String,
                //   reference : String
                // },
                // name: String,
                // lastName: ,
                // telephone: ,
                // method: ,
                // email: 
            };
            yield User_1.default.findByIdAndUpdate((data.id), { historyBuy: [compra] });
            res.send({ message: "Successull payment" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ mirar: 'este es el lio', message: error.raw.message });
    }
}));
exports.default = router;
