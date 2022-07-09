import  { Router } from'express';
import User from '../../../models/Users/User';
const router = Router();

router.post('/register', async (req, res, next) => { 
    const {users, name, lastname, email, favorites, telephone, address, password} = req.body
    try{ 
        if (!email || !password){
            return res.status(400).json({msg: "Por favor, llenar todos los campos"})
        };       
        const user = await User.find({email});
        console.log(user)
        if (user.length){
            return res.status(200).json("Ususario existente");
        };
        const newuser = new User({users, name, lastname, email, favorites, telephone, address, password});
        await newuser.save();
        res.status(201).json(newuser)
    } catch (error) {
        next(error)
    }
})

export default router;