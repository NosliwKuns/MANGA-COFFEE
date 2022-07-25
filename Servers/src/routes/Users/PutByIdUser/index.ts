import { Router } from 'express';
import fs from 'fs-extra';
import passport from "passport";
import { Uploadimage } from '../../../config/Cloudinary/index.js';
import ReadTokenData from '../../../controles/Token/ReadTokenData/index.js';
import { FilesImage } from '../../../middlewares/FileUpload/index.js';
import User from '../../../models/Users/User.js';
const router = Router();

router.put('/update', passport.authenticate("jwt", { session: false }), FilesImage(),  async(req, res, next) => {
    console.log(req.files, "filesssssssssssssss")
    // console.log(req.body, "bodyyyyyyyyyyyyyy")
    const { users, name, lastname, user_description, telephone, address, token }: any = req.body;

    const {authorization} = req.headers;  
    try {  
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        let newuser_banner;
        let newuser_image;
        if (user){

            
            if (req.files?.user_banner){
                const { user_banner}: any = req.files; 
                let folderpath = `User/${user.email}/user_banner`;
                newuser_banner = await Uploadimage(user_banner.tempFilePath, folderpath);
                await fs.unlink(user_banner.tempFilePath)
            }
            if (req.files?.user_image){
                const { user_image }: any = req.files; 

                let folderpath = `User/${user.email}/user_banner`;
                newuser_image = await Uploadimage(user_image.tempFilePath, folderpath);
                await fs.unlink(user_image.tempFilePath)
            }
            
            const userUpdate = {
                users: users || user.users,
                name: name || user.name,
                lastname: lastname || user.lastname,
                user_description: user_description || user.user_description,
                telephone: telephone || user.telephone,
                address: address || user.address,
                user_banner: newuser_banner?.secure_url || user.user_banner, 
                user_image: newuser_image?.secure_url || user.user_image
            }                        

            await User.findByIdAndUpdate((data.id), userUpdate);
            let userFinish: any = await User.findById(data.id);
            if (userFinish){
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
                    telephone: userFinish.telephone || "" ,
                    token: token,
                    user: userFinish.users,
                    user_banner: userFinish.user_banner,
                    user_description: userFinish.user_description,
                    user_image: userFinish.user_image,
                    verificated:  userFinish.verificated,
                    wishlist:  userFinish.wishlist,
                }
                res.status(200).json(newuser);
            } else{
                res.status(400).json('Error al modificar la informacion del usuario')
            }            
        } else {
            res.status(400).json('Usuario no encontrado');
        }    
    } catch (error) {
        next(error);
    };
});

export default router;