import { Router } from 'express';
// import passport from "passport";
import User from '../../../models/Users/User.js';
// import ReadTokenData from '../../../controles/Token/ReadTokenData/index';
const router = Router();
// passport.authenticate("jwt", { session: false }),
router.get('/verificated/:id',  async(req, res, next) => {
    // const {authorization} = req.headers; 
    const {id} = req.params;   
    try {        
        // const data= ReadTokenData(authorization);
        let user = await User.findById(id);
        if (user){
            user.verificated = true
            let newuser = user.save()
            res.status(200).json(newuser)
        }        
    } catch (error) {
        next(error)
    }
})

export default router;