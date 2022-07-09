import  { Router } from'express';
import User from '../../../models/Users/User';
const router = Router();

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
        const newuser = new User({users, name, lastname, email, favorites, telephone, address, password});
        await newuser.save();
        res.status(201).json(newuser);
    } catch (error) {
        next(error);
    }
})

export default router;