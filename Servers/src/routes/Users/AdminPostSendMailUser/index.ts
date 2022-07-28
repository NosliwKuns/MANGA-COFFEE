import { Router } from 'express';
import passport from "passport";
import User from '../../../models/Users/User.js';
import ReadTokenData from '../../../controles/Token/ReadTokenData/index';
import sendEmail from '../../../controles/Email/SendEmail/index.js';
import AdminNotification from '../../../controles/Email/Template/NotificacionesAdmin/index.js';
const router = Router();

router.post('/sendadminnoti/:id', passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const {authorization} = req.headers; 
    const {id} = req.params;
    const {subject, msg} = req.body;   
    
    try {        
        const data= ReadTokenData(authorization);
        const userAdmin = await User.findById(data.id);
        if (userAdmin && userAdmin.admin){
            const user = await User.findById(id);
            const template = AdminNotification(msg);
            if (user){
                sendEmail((user.email), subject, template);
                res.status(200).json('The email has been sent successfully!')
            }else{
                res.status(400).json('Error: Unidentify User');
            }            
        }else {
            res.status(400).json('You are not authorized to do this action');
        }       
    } catch (error) {
        next(error)
    }
})

export default router;