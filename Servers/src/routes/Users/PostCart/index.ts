import {Router} from 'express';
import passport from "passport";
import User from '../../../models/Users/User'
import Product from '../../../models/Products/index'

const router = Router();

router.post("/addtocart/:_id", passport.authenticate("jwt", { session: false }), async (req, res,next) =>{
    const {_id} = req.params;
    const {id , cuantity} = req.body;
    console.log(cuantity)
    try {
        const Usuarios:any= await User.findOne({_id:_id});
        const Productos:any= await Product.findById({_id:id});
        
        if(!Usuarios.cart.includes(Productos._id)){
            Usuarios.cart.push( {id , cuantity})
            await Usuarios.save();
            res.status(200).send(Usuarios);
        }else{
            res.status(200).send("this item is allredy in the cart")
        }
        
    }catch(error){
        next(error)
    }
});

export default router;
