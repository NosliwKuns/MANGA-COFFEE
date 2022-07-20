import { Router } from 'express';
import sendEmail from '../../../controles/Email/SendEmail/index.js';
import Welcome from '../../../controles/Email/Template/bienvenida/index.js';
import verificCorreo from '../../../controles/Email/Template/confirCuenta/index.js';
import ResetUser from '../../../controles/Email/Template/RecuperarCuenta/index.js';
import createToken from '../../../controles/Token/CreatedToken/index.js';
import User from '../../../models/Users/User.js';
const router = Router();

router.put('/resetuser/',  async(req, res, next) => {
    const {users, email, password, verificated, name, lastname, user_image, user_banner,
         user_description, telephone, address, historyBuy, favorites, wishlist, continuar} = req.body;   
    try {  
            if (continuar){
                const user: any = await User.findOne({email});
                let template = ResetUser(user.users, user.id);
                sendEmail(email, 'Recuperar cuenta', template)
                res.status(201).json('Confirmar solicitud desde el correo electronico');
            }else{
                const user: any = await User.findOne({email});
                let mail = user.email + '_deprecated';
                await User.findByIdAndUpdate({_id: user.id}, {email: mail});
                let newuser = new User({users, email, password, verificated, name, lastname, user_image, user_banner, user_description, telephone, address, historyBuy, favorites, wishlist});
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
            }                                              
    } catch (error) {
        next(error);
    }
})

export default router;