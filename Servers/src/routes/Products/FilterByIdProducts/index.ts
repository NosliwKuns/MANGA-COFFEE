import {Router} from 'express';
import Products from '../../../models/Products/index';
const router = Router();

router.get('/:id', async(req, res, next) => {
    const {id} = req.params;
    try {
        let product = await Products.findById(id)
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: 'Error'})
    }
})
export default router;