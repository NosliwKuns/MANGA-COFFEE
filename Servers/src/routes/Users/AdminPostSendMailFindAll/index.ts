import { Router } from 'express';
import passport from "passport";
import User from '../../../models/Users/User.js';
import ReadTokenData from '../../../controles/Token/ReadTokenData/index';
import sendEmail from '../../../controles/Email/SendEmail/index';
import AdminNotiPubli from '../../../controles/Email/Template/NotiPubliAdminFindAll/index.js';
const router = Router();

router.post('/adminmails', passport.authenticate("jwt", { session: false }), async (req, res, next)=>{
    const {authorization} = req.headers; 
    const {subject, msg, image}=req.body;
    try{  
        const data= ReadTokenData(authorization);
        const userAdmin = await User.findById(data.id);
        if (userAdmin && userAdmin.admin){
            const template = AdminNotiPubli(msg, image);
            const mail:string = userAdmin.email;
            const correos= await User.find({email:{$not:{$regex: '.*' + mail || 'deprecated' + '.*', $options: 'i' }}} ,["email"]);
            console.log(correos)
            correos.forEach(element => {
                sendEmail(element.email, subject, template);
            });        
            res.status(200).json('Se ha enviado el correo a todos los usuarios de forma exitosa');
        } else {
            res.status(400).json('No cuenta con autorizacion para realizar esta accion');
        }          
    }catch(err){
        next(err)
    }
})

export default router;