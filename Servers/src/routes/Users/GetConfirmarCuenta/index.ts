import { Router } from 'express';
import createToken from '../../../controles/Token/CreatedToken/index.js';
import User from '../../../models/Users/User.js';
const router = Router();

router.get('/verificated/:id',  async(req, res, next) => {
    const {id} = req.params;   
    try {        
        let user = await User.findById(id);
        if (user){
            user.verificated = true;
            let newuser = await user.save();
            const token = createToken(newuser);
            res.status(201).json({token, usuario: newuser});
        }        
    } catch (error) {
        next(error)
    }
})

export default router;