import { Router } from 'express';
import User from '../../../models/Users/User'
import Product from '../../../models/Products/index'

const router = Router();


router.get('/wishlist/:id', async(req, res, next) => {
    const {id} = req.params;
    let wish={}
    try { 
        console.log(id)
        const Usuario:any = await User.findById(id, ['wishlist'])
        wish = await Product.paginate({_id:Usuario?.wishlist},
        {
	    limit:12,
            select: ["name", "category", "description" ,"price","product_image"],
            sort:{name:1}
        })
        res.status(200).json(wish)
        
    } catch (error) {
        next(error)
    }
})

export default router;