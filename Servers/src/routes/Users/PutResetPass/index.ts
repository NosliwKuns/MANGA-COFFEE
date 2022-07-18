import { Router } from 'express';
import User from '../../../models/Users/User.js';
const router = Router();

router.put('/resetpass/:id',  async(req, res, next) => {
    const {id} = req.params;
    const {password} = req.body;   
    try {  
        let user = await User.findById(id); 
        let {users, email} = user; 
        if (user){
            let newUser = new User({users, email, password});    
            await User.findByIdAndUpdate((id), {password: newUser.password});
            res.status(201).json('contraseña modificada con exito');  
        }                      
    } catch (error) {
        next(error)
    }
})

export default router;