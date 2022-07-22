import {Router} from 'express';
import User from '../../../models/Users/User'
import Product from '../../../models/Products/index'

const router = Router();

router.post("/addToWishlist/:_id", async (req, res,next) =>{
    const {_id} = req.params;
    const {productsId} = req.body;
    try{
        const Usuarios:any= await User.findOne({_id:_id});
        const Productos:any= await Product.findById({_id:productsId});
    
        if(!Usuarios.wishlist.includes(Productos._id)){
            Usuarios.wishlist.push(Productos._id)
            await Usuarios.save();
            res.status(200).send("producto agregado a la wishlist");
        }else{
            res.status(200).send("el producto ya esta en la lista de deseos")
        }
        
    }catch(error){
        next(error)
    }
});

export default router;