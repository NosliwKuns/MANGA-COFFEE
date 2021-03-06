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
router.put('/rating/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { ratinger } = req.body;
    const { id } = req.params;
    console.log(ratinger);
    try {
        yield index_1.default.findByIdAndUpdate((id), { $push: { ratinger: ratinger } });
        let response = yield index_1.default.findOne({ _id: id });
        let response2 = response.ratinger.reduce((a, b) => (a + b)) / response.ratinger.length;
        yield index_1.default.findByIdAndUpdate((id), { $set: { rating: response2 } });
        res.status(200).json(response2);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
