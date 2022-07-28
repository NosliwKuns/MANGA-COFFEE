import { Router } from 'express';
import fs from 'fs-extra';
import passport from "passport";
import User from '../../../models/Users/User.js';
import ReadTokenData from '../../../controles/Token/ReadTokenData/index';
import sendEmail from '../../../controles/Email/SendEmail/index';
import AdminNotiPubli from '../../../controles/Email/Template/NotiPubliAdminFindAll/index.js';
import { FilesImage } from '../../../middlewares/FileUpload/index.js';
import { Uploadimage } from '../../../config/Cloudinary/index.js';
const router = Router();

router.post('/adminmails', passport.authenticate("jwt", { session: false }), FilesImage(), async (req, res, next)=>{
    const {authorization} = req.headers; 
    const {subject, msg}=req.body;
    try{  
        console.log(req.body)
        console.log(req.files)
        const data= ReadTokenData(authorization);
        const userAdmin = await User.findById(data.id);
        if (userAdmin && userAdmin.admin){
            let template: string;
            if (req.files?.image){
                const { image }: any = req.files;
                let folderpath = `User/Admin/Publicidad/${subject}`;
                let PublicidadClaudinary = await Uploadimage(image.tempFilePath, folderpath);
                await fs.unlink(image.tempFilePath);
                template = AdminNotiPubli(msg, PublicidadClaudinary.secure_url);
            } else {
                template = AdminNotiPubli(msg, null);
            }
            const mail:string = userAdmin.email;
            let correos= await User.find({email:{$not: {$regex: '.*'+ "deprecated" +'.*', $options: 'i' }}}, ["email"]);
            correos = correos.filter((element)=> element.email !== mail);
            correos.forEach(element => {
                sendEmail(element.email, subject, template);           
            });             
            res.status(200).json('The email has been sent successfully to all Users');                        
        } else {
            res.status(400).json('You are not authorized to do this action');
        }          
    }catch(err){
        next(err)
    }
})

export default router;