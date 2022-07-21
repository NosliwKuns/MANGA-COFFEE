import  { Router } from'express';
import User from '../../../models/Users/User';
import createToken from '../../../controles/Token/CreatedToken/index';
const router = Router();

router.post('/login', async(req, res, next) => { 
    const {email, password} = req.body;
    try{ 
        if (!email || !password){
            res.status(400).json("Por favor, llenar todos los campos");
        };       
        const user: any = await User.findOne({email});
        if (!user){
            res.status(400).json("Usuario inexistente");
        };
        if (!user.status){
            res.status(400).json("Cuenta eliminada; por favor registrese de nuevo")
        }
        const istmach = await user.comparePassword(password);
        if (istmach){
            res.status(200).json({token:createToken(user), usuario: user});
        } 
        if(email === password) {
            res.status(400).json("Inicie secion con su correo y contraseña")
        }
        res.status(400).json("Informacion no coincide");
    } catch (error) {
        next(error);
    }
})

export default router;
