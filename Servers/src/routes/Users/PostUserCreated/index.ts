import  { Router } from'express';
import User from '../../../models/Users/User';
import createToken from '../../../controles/Token/CreatedToken/index';
import verificCorreo from '../../../controles/Email/Template/confirCuenta/index';
import sendEmail from '../../../controles/Email/SendEmail/index';
import Welcome from '../../../controles/Email/Template/bienvenida';
const router = Router();

router.post('/register', async (req, res, next) => { 
    const {users, email, password, verificated, name, lastname, user_image, user_banner, user_description, telephone, address} = req.body;
    try{ 
        if (!email || !password){
            return res.status(200).json("Por favor, llenar todos los campos");
        };       
        const user = await User.find({email});
        if (user.length){
            return res.status(200).json("Usuario existente");
        };
        let newuser = new User({users, email, password, verificated, name, lastname, user_image, user_banner, user_description, telephone, address});
        const token = createToken(newuser);
        newuser = await newuser.save();
        let template;
        if (newuser.verificated){
            template = Welcome(users);
            sendEmail(email, 'Mensaje de Bienvenida', template);
        } else {
            template = verificCorreo(users, newuser._id);
            sendEmail(email, 'Confirmacion de cuenta', template);
        }        
        res.status(201).json({token, usuario: newuser});
    } catch (error) {
        next(error);
    }
})

export default router;