import { Router } from 'express';
import fs from 'fs-extra';
import passport from "passport";
import { Uploadimage } from '../../../config/Cloudinary/index.js';
import ReadTokenData from '../../../controles/Token/ReadTokenData/index.js';
import { FilesImage } from '../../../middlewares/FileUpload/index.js';
import User from '../../../models/Users/User.js';
const router = Router();

router.put('/update', passport.authenticate("jwt", { session: false }), FilesImage(),  async(req, res, next) => {
    const { users, name, lastname, user_description, telephone, address, token }: any = req.body;
    const { user_banner, user_image }: any = req.files; 
    const {authorization} = req.headers;  
    try {  
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        let newuser_banner;
        let newuser_image;
        if (user){
            if (user_banner){
                let folderpath = `User/${user.email}/user_banner`;
                newuser_banner = await Uploadimage(user_banner.tempFilePath, folderpath);
                await fs.unlink(user_banner.tempFilePath)
            }
            if (user_image){
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
                userFinish['token'] = token
                res.status(200).json(userFinish);
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