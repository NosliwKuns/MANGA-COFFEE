import { Router } from 'express';
import passport from "passport";
import User from '../../../models/Users/User.js';
import ReadTokenData from '../../../controles/Token/ReadTokenData/index';
const router = Router();


router.put('/state', passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const {authorization} = req.headers;
    const {password} = req.body;
    try{
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        const istmach = await user?.comparePassword(password);
        if (istmach){
            await User.findByIdAndUpdate(data.id, {status:false,});    
            res.status(200).send("Cuenta eliminada con exito");
        } else {
            res.status(400).json("Informacion no coincide");
        }    
    }catch(err){
        next(err)
    }
})

export default router;