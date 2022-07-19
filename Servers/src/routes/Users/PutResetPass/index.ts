import { Router } from 'express';
import User from '../../../models/Users/User.js';
import bCrypt from 'bcrypt';
const router = Router();

router.put('/resetpass/:id',  async(req, res, next) => {
    const {id} = req.params;
    const {password} = req.body;   
    try {  
        let user = await User.findById(id);  
        if (user){
            const salt = await bCrypt.genSalt(10);
            const hash = await bCrypt.hash(password, salt);
            await User.findByIdAndUpdate((id), {password: hash});
            res.status(201).json('contraseña modificada con exito');  
        };                            
    } catch (error) {
        next(error);
    }
})

export default router;