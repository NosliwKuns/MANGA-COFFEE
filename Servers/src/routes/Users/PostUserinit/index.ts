import  { Router } from'express';
import User from '../../../models/Users/User';
import createToken from '../../../controles/Token/CreatedToken/index';
const router = Router();

router.post('/login', async(req, res, next) => { 
    const {email, password} = req.body;
    try{ 
        if (!email || !password){
            return res.status(200).json("Por favor, llenar todos los campos");
        };       
        const user = await User.findOne({email});
        if (!user){
            return res.status(200).json("Usuario inexistente");
        };
        const istmach = await user.comparePassword(password);
        if (istmach){
            return res.status(200).json({token:createToken(user), usuario: user});
        };
        return res.status(200).json("Informacion no coincide");
    } catch (error) {
        next(error);
    }
})

export default router;