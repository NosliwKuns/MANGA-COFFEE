import { Router } from 'express';
import passport from "passport";
import User from '../../../models/Users/User.js';
import ReadTokenData from '../../../controles/Token/ReadTokenData/index';
const router = Router();

router.put('/swichtstatus/:id', passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const {authorization} = req.headers; 
    const {id} = req.params;   
    try {        
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        if (user && user.admin){
            const user = await User.findById(id)
            if (user && user.status){
                await User.findByIdAndUpdate((id), {status: false})
            }else {
                await User.findByIdAndUpdate((id), {status: true})
            }
            res.status(200).json('El estado de la cuenta se modifico correctamente')
        }else {
            res.status(400).json('No cuenta con autorizacion para realizar esta accion');
        }       
    } catch (error) {
        next(error)
    }
})

export default router;