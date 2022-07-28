import  { Router } from'express';
import User from '../../../models/Users/User';
import createToken from '../../../controles/Token/CreatedToken/index';
const router = Router();

router.post('/login', async(req, res, next) => { 
    const {email, password} = req.body;
    try{        
        const user: any = await User.findOne({email});
        if (!email || !password){
            res.status(400).json("You must fill out all fields");
        } else if (!user){
            res.status(400).json("Non Existent User");
        } else if (!user.status){
            res.status(400).json("This Account was deleted, please sing Up again");
        }else if (user.block){
            res.status(400).json("Your Account has been Banned ; if you belive this was a mistake you can comunicate with us by email");
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
