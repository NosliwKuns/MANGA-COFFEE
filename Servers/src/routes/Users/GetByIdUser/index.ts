import { Router } from 'express';
// import passport from "passport";
import User from '../../../models/Users/User.js';
const router = Router();

// passport.authenticate("jwt", { session: false })
router.get('/:id', async(req, res, next) => {
    console.log('GetByIdUser')
    const {id} = req.params;
    try { 
        console.log(id)
        const user = await User.findById(id)
        console.log(user)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

export default router;