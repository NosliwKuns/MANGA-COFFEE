import {Router} from 'express';
import Users from '../../../models/Users/User'
import Products from '../../../models/Products/index'

const router = Router();

router.post("/addToWishlist", async (req, res) =>{
    const {email} = req.body;
    const productsId = req.body;
    try{
        const user = await Users.findOne({email: email});
        if(!user){
            res.status(404).json({message: "User not found"})
        }else{
            console.log(user)
            const product = await Products.findOne({id: productsId,});
            if(!product){
                res.status(404).json({message: "Product not found"})
            }else{
                if (user.wishlist.includes(product.id)){
                    res.status(400).json({message: "Product already in wishlist"})
                }
                user.wishlist.push(productsId);
                await user.save();
                res.status(200).json({message: "Product added to wishlist"})
            }
        }
        
    }catch(error){
        res.status(500).json(error);
    }
});

export default router;