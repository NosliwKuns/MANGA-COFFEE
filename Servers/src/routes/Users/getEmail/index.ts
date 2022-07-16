import { Router } from 'express';
import User from '../../../models/Users/User.js';
import sendEmail from '../../../controles/Email/SendEmail/index';
const router = Router();

router.post('/emails', async (req, res, next)=>{
    try{
        const {template,asunto}=req.body
        console.log(template);
        const correos= await User.find({},["email"])
        res.status(200).json(correos)
        correos.forEach(element => {
            sendEmail(element.email, asunto ,template)
        });
    }catch(err){
        next(err)
    }
})

export default router;