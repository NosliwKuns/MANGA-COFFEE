import {Router} from 'express';
import passport from 'passport';
import ReadTokenData from '../../../controles/Token/ReadTokenData';
import User from '../../../models/Users/User';
const router = Router();

router.delete('/deletecart/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const {authorization} = req.headers;
    const { id } = req.params;
    try {
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        if (user){
            let carrt = user.cart.filter((e: any) => e.id !== id);
            await User.findByIdAndUpdate((data.id), {cart: carrt});
            const usern = await User.findById(data.id);
            res.status(200).json(usern?.cart);
        } else {
            res.status(404).json('user not founded');
        }       
    }
    catch(error){
        next(error);
    }
});

export default router;