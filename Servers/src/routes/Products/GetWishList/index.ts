import {Router} from 'express';
import Products from '../../../models/Products/index';
import Users from '../../../models/Users/User'

const router = Router();
router.post('/wishlist' , async(req, res, next) => {
    const {userId} = req.body;
    const {id} = req.body;
    try{

        let user = await Users.findById(userId)
        if(!user){
            res.status(404).json({message: 'User not found'})
        } else {
            let Product = await Products.findById(id)
            if(!Product){
                res.status(404).json({message: 'Product not found'})
            }
            else{
                let product = await Products.findByIdAndUpdate(id, {$push: {wishlist: userId}})
                res.status(200).json(product)
            }
        }
    } catch(error){
        res.status(500).json(error)
    }   
})
export default router;