import { Router } from 'express';
import User from '../../../models/Users/User'
import Product from '../../../models/Products/index'


const router = Router();


router.get('/addtocart/:id', async(req, res, next) => {
    const {id} = req.params;
    let shoppingCart:any
    try { 
        const Usuario:any = await User.findById(id,[ 'cart'])
            
            shoppingCart = await Product.find({_id:Usuario.cart},{})
            let inter = Usuario.cart
        
            console.log(shoppingCart , inter)
            
            let carts= []
            
            for (let i = 0; i < shoppingCart.length; i++) {
                for (let j = 0; j < inter.length; j++) {
                    if(inter[j]._id === shoppingCart[i].id){
                        let cart = {
                            ...shoppingCart[i]._doc,
                            cuantity:inter[j].cuantity
                        }
                        carts.push(cart)
                    }
            }
            
        }
        console.log(carts)
        res.status(200).json(carts)

            //   let merged = {shoppingCart}




        
    } catch (error) {
        next(error)
    }
})
export default router;
