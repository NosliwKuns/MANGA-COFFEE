import  { Router } from'express';
import User from '../../../models/Users/User';
import createToken from '../../../controles/Token/CreatedToken/index';
import getTemplate from '../../../controles/Email/Template/index';
import sendEmail from '../../../controles/Email/SendEmail/index';
const router = Router();

router.post('/register', async (req, res, next) => { 
    const {users, name, lastname, email, favorites, telephone, address, password, user_image} = req.body;
    try{ 
        if (!email || !password){
            return res.status(200).json("Por favor, llenar todos los campos");
        };       
        const user = await User.find({email});
        if (user.length){
            return res.status(200).json("Usuario existente");
        };
        let newuser = new User({users, name, lastname, email, favorites, telephone, address, password ,user_image});
        const token = createToken(newuser);
        newuser = await newuser.save();
        const template = getTemplate(users, newuser.id);
        sendEmail(email, 'Confirmacion de cuenta', template);
        res.status(201).json({token, usuario: newuser});
    } catch (error) {
        next(error);
    }
})

export default router;