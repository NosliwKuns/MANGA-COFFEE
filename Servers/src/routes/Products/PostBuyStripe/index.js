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
//import sendEmail from '../../../controles/Email/SendEmail';
//import NotificationBuy from '../../../controles/Email/Template/NotificacionCompra';
const router = (0, express_1.Router)();
const stripe = new stripe_1.default("sk_test_51LLrJiAaJyGKFRYYchn8r6wj05opINEVucofBXXorZQWhuq1zFJ1FW3Ys134xp4FuqnQynqh7CaQ6Rhks29Fck4t00fvKC5c6E", { apiVersion: "2020-08-27" });
router.post("/checkout/:idCompra", passport_1.default.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adrress, product, InfoComprador } = req.body;
        const { idCompra } = req.params;
        const { authorization } = req.headers;
        let amount = 0;
        let ArrrayProducts = [{}];
        product.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
            const producto = yield index_1.default.findById(element.idProduct);
            if (producto) {
                let stock = producto.stock - element.quantity;
                yield index_1.default.findByIdAndUpdate((element.idProduct), { stock: stock });
                let totProduct = producto.price * element.quantity * 100;
                amount += totProduct;
                let DetailProduct = {
                    idProduct: element.idProduct,
                    name: producto.name,
                    price: producto.price,
                    quantity: element.quantity,
                    totProduct: totProduct,
                };
                Object.keys(ArrrayProducts[0]).length ? ArrrayProducts.push(DetailProduct) : ArrrayProducts = [DetailProduct];
            }
        }));
        const payment = yield stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            payment_method: idCompra,
            confirm: true,
        });
        const compra = {
            idCompra: idCompra,
            produtcs: ArrrayProducts,
            total: amount,
            adrress: adrress,
            InfoComprador: InfoComprador,
        };
        console.log(payment);
        const data = (0, ReadTokenData_1.default)(authorization);
        yield User_1.default.findByIdAndUpdate((data.id), { $push: { historyBuy: [compra] } });
        //let template = NotificationBuy()
        //sendEmail(data.email, 'Notificacion de compra', template)
        res.send({ message: "Successull payment" });
    }
    catch (error) {
        console.log(error);
        res.json({ leer: 'error de stripe', message: error.raw.message });
    }
}));
exports.default = router;
