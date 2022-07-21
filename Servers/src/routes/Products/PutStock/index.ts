import {Router} from 'express';
import Products from '../../../models/Products/index';
const router = Router();

router.put('/stock/:id', async (req, res, next) => {
    const updates = req.body
    const {id} = req.params;
    try {          
        await Products.findByIdAndUpdate((id), {$inc:updates})
        let otro: any = await Products.findOne({_id:id})
        res.status(200).json(otro.stock)
    } catch (error) {
        next(error)
    }

})
export default  router;