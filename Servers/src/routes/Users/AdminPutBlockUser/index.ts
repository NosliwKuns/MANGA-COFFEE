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
            res.status(200).json()
        }else {
            res.status(400).json('No cuenta con autorizacion para realizar esta accion');
        }       
    } catch (error) {
        next(error)
    }
})

export default router;