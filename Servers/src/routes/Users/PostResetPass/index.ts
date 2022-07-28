import { Router } from 'express';
import sendEmail from '../../../controles/Email/SendEmail/index.js';
import ResetPass from '../../../controles/Email/Template/ResetPass/index.js';
import User from '../../../models/Users/User.js';
const router = Router();

router.post('/resetpass/',  async(req, res, next) => {
    const {email} = req.body;   
    try {        
        const user = await User.findOne({email});      
        if (user){
            let template = ResetPass(user.users, user._id);
            sendEmail(email, 'cambio de contraseña', template);
            res.status(200).json('Task Failed Successfully');
        } else {
            res.status(200).json('Non Existent User');
        };                       
    } catch (error) {
        next(error);
    }
})

export default router;