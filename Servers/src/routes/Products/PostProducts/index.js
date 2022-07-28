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
const fs_extra_1 = __importDefault(require("fs-extra"));
const passport_1 = __importDefault(require("passport"));
const Cloudinary_1 = require("../../../config/Cloudinary");
const ReadTokenData_1 = __importDefault(require("../../../controles/Token/ReadTokenData"));
const FileUpload_1 = require("../../../middlewares/FileUpload");
const index_1 = __importDefault(require("../../../models/Products/index"));
const User_1 = __importDefault(require("../../../models/Users/User"));
const router = (0, express_1.Router)();
router.post('/poster/products', passport_1.default.authenticate("jwt", { session: false }), (0, FileUpload_1.FilesImage)(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_User, name, description, stock, price, category, title } = req.body;
    const { authorization } = req.headers;
    let { product_image } = req.files;
    try {
        const data = (0, ReadTokenData_1.default)(authorization);
        const useradmin = yield User_1.default.findById(data.id);
        if (useradmin) {
            if (useradmin.admin) {
                if (product_image) {
                    let folderpath = `Productos/${name}`;
                    let linkCloudinary = yield (0, Cloudinary_1.Uploadimage)(product_image.tempFilePath, folderpath);
                    yield fs_extra_1.default.unlink(product_image.tempFilePath);
                    product_image = linkCloudinary.secure_url;
                    const product = new index_1.default({ id_User, name, product_image, description, stock, price, category: [category], title });
                    yield product.save();
                    res.status(201).json("Product added successfull");
                }
                else {
                    res.status(400).json("Uncomplete Information");
                }
            }
            else {
                res.status(400).json('You are not authorized');
            }
        }
        else {
            res.status(400).json("User not found");
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
