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
const router = (0, express_1.Router)();
const stripe = new stripe_1.default("sk_test_51LLrJiAaJyGKFRYYchn8r6wj05opINEVucofBXXorZQWhuq1zFJ1FW3Ys134xp4FuqnQynqh7CaQ6Rhks29Fck4t00fvKC5c6E", { apiVersion: "2020-08-27" });
router.post("/checkout:idCompra", passport_1.default.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quantity, idProduct } = req.body;
        const { idCompra } = req.params;
        const { authorization } = req.headers;
        const data = (0, ReadTokenData_1.default)(authorization);
        const product = yield index_1.default.findById(idProduct);
        let amount = product.price * quantity;
        console.log(product.price);
        const payment = yield stripe.paymentIntents.create({
            amount: 100,
            currency: "USD",
            description: product === null || product === void 0 ? void 0 : product.description,
            payment_method: idCompra,
            confirm: true,
        });
        console.log(payment);
        res.send({ message: "Successull payment" });
    }
    catch (error) {
        console.log(error);
        res.json({ message: error.raw.message });
    }
}));
exports.default = router;
