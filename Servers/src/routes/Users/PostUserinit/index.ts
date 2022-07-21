import  { Router } from'express';
import User from '../../../models/Users/User';
import createToken from '../../../controles/Token/CreatedToken/index';
const router = Router();

router.post('/login', async(req, res, next) => { 
    const {email, password} = req.body;
    try{        
        const user: any = await User.findOne({email});
        if (!email || !password){
            res.status(400).json("Por favor, llenar todos los campos");
        } else if (!user){
            res.status(400).json("Usuario inexistente");
        } else if (!user.status){
            res.status(400).json("Cuenta eliminada; por favor registrese de nuevo");
        }else if (user.block){
            res.status(400).json("Cuenta bloqueada; si hubo un error, por favor informenos por medio de nuestro correo oficial ");
        } else {
            const istmach = await user.comparePassword(password);        
            if (istmach){
                res.status(200).json({token:createToken(user), usuario: user});
            } else if (!istmach && email === password) {
                res.status(400).json("Inicie seccion con su correo y contraseña");
            } else {
                res.status(400).json("Informacion no coincide");
            }; 
        }       
    } catch (error) {
        next(error);
    };
});

export default router;
