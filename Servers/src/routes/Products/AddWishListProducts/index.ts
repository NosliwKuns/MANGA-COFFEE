import {Router} from 'express';
import Users from '../../../models/Users/User'
import Products from '../../../models/Products/index'

const router = Router();

router.post("/addToWishlist", async (req, res) =>{
    const {email} = req.body;
    const {productsId} = req.body;
    try{
        const user = await Users.findOne({email: email});
        if(!user){
            res.status(404).json({message: "Usernot found"})
        }else{
            console.log(user)
            const product = await Products.findById({_id: productsId});
            if(!product){
                res.status(404).json({message: "Product not found"})
            }else{
                if(!user.wishlist.includes(product.id)){
                    user.wishlist.push(product.id);
                    await user.save();
                    res.status(200).json({message: "Product added to wishlist"})
                }else{
                    res.status(200).json({message: "Product already in wishlist"})
                }
            }
        }
        
    }catch(error){
        res.status(500).json(error);
    }
});

export default router;