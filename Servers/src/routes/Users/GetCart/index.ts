import { Router } from 'express';
import User from '../../../models/Users/User'
import Product from '../../../models/Products/index'


const router = Router();


router.get('/addtocart/:id', async(req, res, next) => {
    const {id} = req.params;
    let shoppingCart={}
    try { 
        const Usuario:any = await User.findById(id,[ 'cart'])
            
            shoppingCart = await Product.find({_id:Usuario.cart},{})
            let inter = Usuario.cart
        

        let merged = {inter,shoppingCart}

    res.status(200).json(merged)
        
    } catch (error) {
        next(error)
    }
})
export default router;
