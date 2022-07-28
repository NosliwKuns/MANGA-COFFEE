import {Router} from 'express';
import fs from 'fs-extra';
import passport from 'passport';
import { Uploadimage } from '../../../config/Cloudinary';
import ReadTokenData from '../../../controles/Token/ReadTokenData';
import { FilesImage } from '../../../middlewares/FileUpload';
import Product from '../../../models/Products/index';
import User from '../../../models/Users/User';
const router = Router();


router.post('/poster/products', passport.authenticate("jwt", { session: false }), FilesImage(), async(req, res, next) => {
    const { id_User, name, description, stock, price, category, title} = req.body;
    const {authorization} = req.headers;
    let { product_image }: any= req.files;
    try {
        const data = ReadTokenData(authorization);
        const useradmin = await User.findById(data.id);
        if (useradmin){
            if (useradmin.admin){
                if (product_image){
                    let folderpath = `Productos/${name}`;
                    let linkCloudinary = await Uploadimage(product_image.tempFilePath, folderpath);
                    await fs.unlink(product_image.tempFilePath);
                    product_image = linkCloudinary.secure_url;
                    const product = new Product({ id_User, name, product_image, description, stock , price, category: [category], title})
                    await product.save();
                    res.status(201).json("Product addes successfull");                    
                }else{
                    res.status(400).json("Uncomplete Information");
                }
            } else {
                res.status(400).json('You are not authorized');           
            }
        } else {
            res.status(400).json("User not founded")
        }
    } catch (error) {
        next(error)
    }
})

export default router;