import {Router} from 'express';
import passport from 'passport';
import ReadTokenData from '../../../controles/Token/ReadTokenData';
import User from '../../../models/Users/User';

const router = Router()

router.get('/historybuy/detail/:id', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
    const {authorization} = req.headers;
    const { id } = req.params;
    try {
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        if (user){
            const historyDetail = user.historyBuy.filter((compra: any) => compra.idCompra === id );
            res.status(200).json(historyDetail);            
        } else {
            res.status(400).json('User not found');
        }
    } catch (error) {
        next(error);
    }
} )

export default router;