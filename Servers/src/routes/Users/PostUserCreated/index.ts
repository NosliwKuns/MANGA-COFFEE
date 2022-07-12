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

router.post('/register', async (req, res, next) => { 
    const {users, name, lastname, email, favorites, telephone, address, password} = req.body;
    try{ 
        if (!email || !password){
            return res.status(200).json("Por favor, llenar todos los campos");
        };       
        const user = await User.find({email});
        if (user.length){
            return res.status(200).json("Usuario existente");
        };
        let newuser = new User({users, name, lastname, email, favorites, telephone, address, password});
        newuser = await newuser.save();
        res.status(201).json({token:crateToken(newuser), usuario: newuser});
    } catch (error) {
        next(error);
    }
})

export default router;