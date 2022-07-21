import { Router } from "express";
import passport from "passport";
import User from "../../../models/Users/User.js";
import ReadTokenData from "../../../controles/Token/ReadTokenData/index";
const router = Router();

router.get('/findall', passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const {authorization} = req.headers;    
    try {        
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        if (user && user.admin){
            const mail = user.email;
            const userfindall = await User.find({email:{$not:{$regex: '.*' + mail + '.*', $options: 'i' }}});
            res.status(200).json(userfindall);
        } else {
            res.status(400).json('No cuenta con autorizacion para obtener esta informacion');
        }
    } catch (error) {
      next(error);
    }
  }
);

export default router;
