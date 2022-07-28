import { Router } from 'express';
import passport from "passport";
import User from '../../../models/Users/User.js';
import ReadTokenData from '../../../controles/Token/ReadTokenData/index';
const router = Router();

router.put('/swichtblock/:id', passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const {authorization} = req.headers; 
    const {id} = req.params;   
    try {        
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        if (user && user.admin){
            const user = await User.findById(id)
            if (user && user.block){
                await User.findByIdAndUpdate((id), {block: false})
            }else {
                await User.findByIdAndUpdate((id), {block: true})
            }
            res.status(200).json('the bann state was successfully modified')
        }else {
            res.status(400).json('You are not authorized to do this action');
        }       
    } catch (error) {
        next(error)
    }
})

export default router;