import { Router } from 'express';
import passport from "passport";
import User from '../../../models/Users/User.js';
const router = Router();

router.put('/update/:id', passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    console.log('PutByIdUser')
    const {id} = req.params;   
    try {          
        await User.findByIdAndUpdate({_id: id}, req.body);
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
})

export default router;