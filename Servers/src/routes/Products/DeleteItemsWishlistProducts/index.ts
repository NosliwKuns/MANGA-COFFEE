import {Router} from 'express';
import User from '../../../models/Users/User';

const router = Router();


router.delete('/', async (req, res) => {
  const {id, productId} = req.query;
  try {
      const user: any = await User.findById(id);
      const deleted = await user.wishlist.filter((m: string) => m !== productId)
      await User.findByIdAndUpdate({_id: id}, {wishlist: deleted});
      const userdos = await User.findById(id, ['wishlist'])

      res.status(200).json(userdos)
  }
  catch(error){
      res.status(500).json({message: 'Error'});
  }
}
);



// router.delete("/", async(req, res) => {
//     const id= req.params;
//     const {productsId}= req.body;

//     try {
//       const user:any = await User.findOne({id});
//       if(user){
//         user.wishlist.splice(user.wishlist.indexOf(productsId), 1);
//         await user.save();
//         res.status(200).json({message: "Item deleted From wish list"});
//         console.log(user.wishlist);

//       }

        
//     } catch (error) {   res.status(500).json("error")}  }
//     );
    export default router;
