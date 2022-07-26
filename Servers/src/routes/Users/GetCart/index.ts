import { Router } from 'express';
import User from '../../../models/Users/User'
import Product from '../../../models/Products/index'

const router = Router();


router.get('/addtocart/:id', async(req, res, next) => {
    const {id} = req.params;
    let shopingCart={}
    try { 
        const Usuario:any = await User.findById(id,[ 'cart'])
            
            shopingCart = await Product.paginate({_id:Usuario.cart},
                {
                    limit:12,
                    select: ["name", "category", "description" ,"price","product_image"],
                    sort:{name:1}
                })
            

    res.status(200).json(shopingCart)
        
    } catch (error) {
        next(error)
    }
})
export default router;
