import { Router } from 'express';
import passport from "passport";
import User from '../../../models/Users/User.js';
import ReadTokenData from '../../../controles/Token/ReadTokenData/index';
const router = Router();

router.get('/detail', passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const {authorization} = req.headers;    
    try {        
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

export default router;