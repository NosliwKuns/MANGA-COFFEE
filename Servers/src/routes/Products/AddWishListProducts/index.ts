import {Router} from 'express';
import passport from "passport";
import User from '../../../models/Users/User'
import Product from '../../../models/Products/index'

const router = Router();

router.post("/addToWishlist/:_id", passport.authenticate("jwt", { session: false }), async (req, res,next) =>{
    const {_id} = req.params;
    const {productsId} = req.body;
    try {
        const Usuarios:any= await User.findOne({_id:_id});
        const Productos:any= await Product.findById({_id:productsId});
        
        if(!Usuarios.wishlist.includes(Productos._id)){
            Usuarios.wishlist.push(Productos)
            await Usuarios.save();
            res.status(200).send(Usuarios);
        }else{
            res.status(200).send("Already on the wish list")
        }
        
    }catch(error){
        next(error)
    }
});

export default router;