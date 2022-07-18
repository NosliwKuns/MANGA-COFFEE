import {Router} from 'express';
import Users from '../../../models/Users/User';
const router = Router();

router.delete("/", async(req, res) => {
    const {email}= req.body;
    const {productsId}= req.body;

    try {
       const user = await Users.findOne({email});
      if(user){
        user.wishlist.splice(user.wishlist.indexOf(productsId), 1);
        await user.save();
        res.status(200).json({message: "Producto eliminado de la lista de deseos"});
        console.log(user.wishlist);

      }

        
    } catch (error) {   res.status(500).json("error")}  }
    );
    export default router;
