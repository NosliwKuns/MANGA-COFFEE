import {Router} from 'express';
import User from '../../../models/Users/User';
const router = Router();

router.put('/putcart/:id', async (req, res, next) => {
    const id = req.params.id;
    const {_id , cuantity} = req.body;
    try {
      await User.findByIdAndUpdate(id, {cart:{find:_id,
        $inc:cuantity}
      });
      res.send('Item Updated!');

    } catch (error) {
        next(error);
    }
});
export default router;