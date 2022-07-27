import {Router} from 'express';
import passport from "passport";
import User from '../../../models/Users/User'
import Product from '../../../models/Products/index'

const router = Router();

router.post("/addtocart/:_id",passport.authenticate("jwt", { session: false }), async (req, res, next) =>{
    const id = req.params;
    const {_id , cuantity} = req.body;
    console.log(_id , id)
    try {
        const Usuarios:any= await User.findById(id);
        const Productos:any= await Product.findById(_id);
        
        if(!Usuarios.cart.includes(Productos.id)){
            Usuarios.cart.push( {_id , cuantity})
            await Usuarios.save();
            res.status(200).send(Usuarios.cart);
        }else{
            res.status(200).send("this item is allredy in the cart")
        }
        
    }catch(error){
        next(error)
    }
});

export default router;
//