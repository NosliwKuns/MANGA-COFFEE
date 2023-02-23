import { Router } from 'express';
import User from '../../../models/Users/User.js';
import bcrypt from 'bcryptjs';
const router = Router();

router.put('/resetpass/:id',  async(req, res, next) => {
    const {id} = req.params;
    const {password} = req.body;   
    try {  
        let user = await User.findById(id);  
        if (user){
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await User.findByIdAndUpdate((id), {password: hash, status: true});
            res.status(201).json('Password Updated!');  
        };                            
    } catch (error) {
        next(error);
    }
})

export default router;