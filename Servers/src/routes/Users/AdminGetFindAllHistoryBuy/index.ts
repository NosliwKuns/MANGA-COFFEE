import {Router} from 'express';
import passport from 'passport';
import ReadTokenData from '../../../controles/Token/ReadTokenData';
import User from '../../../models/Users/User';

const router = Router()

router.get('/finall/historybuy', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
    const {authorization} = req.headers;
    try {
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        if (user){
            let history = [];
            for (let i = 0; i < user.historyBuy.length; i++) {
                let name = '';
                user.historyBuy[i].produtcs.forEach((product: any)=>{
                    name += product.name + '; ';
                }) 
                let buy ={
                    date: user.historyBuy[i].date,
                    products: name,
                    total: user.historyBuy[i].total,
                    id: user.historyBuy[i].idCompra
                }
                history.push(buy);                
            }
            res.status(200).json(history)            
        } else {
            res.status(400).json('User not founded')
        }
    } catch (error) {
        next(error)
    }
} )

export default router;