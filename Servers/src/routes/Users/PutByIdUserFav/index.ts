import { Router } from 'express';
import passport from "passport";
import User from '../../../models/Users/User.js';
const router = Router();
 
router.put('/fav/:id', passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const {id} = req.params;
    const {favorites} = req.body;
    try { 
        await User.findByIdAndUpdate((id), {$push:{favorites}});
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
})

export default router;