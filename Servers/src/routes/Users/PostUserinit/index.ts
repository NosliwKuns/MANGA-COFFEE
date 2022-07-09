import  { Router } from'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../../../models/Users/User';
import config from '../../../config/config'
const router = Router();

function crateToken(user: IUser) {
     return jwt.sign({id: user._id, email: user.email}, config.jwtsecret,{
        expiresIn: 86400
    })
}

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
            return res.status(200).json({token:crateToken(user), usuario: user});
        };
        return res.status(200).json("Informacion no coincide");
    } catch (error) {
        next(error);
    }
})

export default router;