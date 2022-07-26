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
const index_js_1 = require("../../../config/Cloudinary/index.js");
const index_js_2 = __importDefault(require("../../../controles/Token/ReadTokenData/index.js"));
const index_js_3 = require("../../../middlewares/FileUpload/index.js");
const User_js_1 = __importDefault(require("../../../models/Users/User.js"));
const router = (0, express_1.Router)();
router.put('/update', passport_1.default.authenticate("jwt", { session: false }), (0, index_js_3.FilesImage)(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(req.files, "filesssssssssssssss");
    // console.log(req.body, "bodyyyyyyyyyyyyyy")
    const { users, name, lastname, user_description, telephone, address, token } = req.body;
    const { authorization } = req.headers;
    try {
        const data = (0, index_js_2.default)(authorization);
        const user = yield User_js_1.default.findById(data.id);
        let newuser_banner;
        let newuser_image;
        if (user) {
            if ((_a = req.files) === null || _a === void 0 ? void 0 : _a.user_banner) {
                const { user_banner } = req.files;
                let folderpath = `User/${user.email}/user_banner`;
                newuser_banner = yield (0, index_js_1.Uploadimage)(user_banner.tempFilePath, folderpath);
                yield fs_extra_1.default.unlink(user_banner.tempFilePath);
            }
            if ((_b = req.files) === null || _b === void 0 ? void 0 : _b.user_image) {
                const { user_image } = req.files;
                let folderpath = `User/${user.email}/user_banner`;
                newuser_image = yield (0, index_js_1.Uploadimage)(user_image.tempFilePath, folderpath);
                yield fs_extra_1.default.unlink(user_image.tempFilePath);
            }
            const userUpdate = {
                users: users || user.users,
                name: name || user.name,
                lastname: lastname || user.lastname,
                user_description: user_description || user.user_description,
                telephone: telephone || user.telephone,
                address: address || user.address,
                user_banner: (newuser_banner === null || newuser_banner === void 0 ? void 0 : newuser_banner.secure_url) || user.user_banner,
                user_image: (newuser_image === null || newuser_image === void 0 ? void 0 : newuser_image.secure_url) || user.user_image
            };
            yield User_js_1.default.findByIdAndUpdate((data.id), userUpdate);
            let userFinish = yield User_js_1.default.findById(data.id);
            if (userFinish) {
                let newuser = {
                    address: userFinish.address,
                    admin: userFinish.admin,
                    block: userFinish.block,
                    email: userFinish.email,
                    favorites: userFinish.favorites,
                    historyBuy: userFinish.historyBuy,
                    id: userFinish._id,
                    lastname: userFinish.lastname,
                    name: userFinish.name,
                    password: userFinish.password,
                    status: userFinish.status,
                    telephone: userFinish.telephone || "",
                    token: token,
                    user: userFinish.users,
                    user_banner: userFinish.user_banner,
                    user_description: userFinish.user_description,
                    user_image: userFinish.user_image,
                    verificated: userFinish.verificated,
                    wishlist: userFinish.wishlist,
                };
                res.status(200).json(newuser);
            }
            else {
                res.status(400).json('Error al modificar la informacion del usuario');
            }
        }
        else {
            res.status(400).json('Usuario no encontrado');
        }
    }
    catch (error) {
        next(error);
    }
    ;
}));
exports.default = router;
