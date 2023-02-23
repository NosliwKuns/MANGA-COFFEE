import  { Router } from'express';
import User from '../../../models/Users/User';
import createToken from '../../../controles/Token/CreatedToken/index';
import verificCorreo from '../../../controles/Email/Template/confirCuenta/index';
import sendEmail from '../../../controles/Email/SendEmail/index';
import Welcome from '../../../controles/Email/Template/bienvenida';
const router = Router();

router.post('/register', async (req, res, next) => { 
    const {users, email, password, verificated, name, lastname, user_image, user_banner, user_description, telephone, address, historyBuy, favorites, wishlist} = req.body;
    try{        
        const user = await User.findOne({email});
        if (!email || !password){
            res.status(200).json("You must fill out all fields");
        } else if (user && !user.status){
            res.status(200).json("An Account with thid email already exist, do you want get it back?");
        } else if (user && user.status){
            res.status(200).json("Existing User");
        }else{
            let newuser = new User({users, email, password, verificated, name, lastname, user_image, user_banner, user_description, telephone, address, historyBuy, favorites, wishlist});
            const token = createToken(newuser);
            newuser = await newuser.save();
            let template;
            if (newuser.verificated){
                template = Welcome(users);
                sendEmail(email, 'Welcome to MangaCoffee', template);
            } else {
                template = verificCorreo(users, newuser._id);
                sendEmail(email, 'Account Confirmation', template);
            }        
            res.status(201).json({token, usuario: newuser});
        } 
    } catch (error) {
        next(error);
    }
})

export default router;