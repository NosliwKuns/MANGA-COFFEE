import {Router} from 'express';
import Products from '../../../models/Products/index';
const router = Router();

router.get('/:id', async(req, res, next) => {
    const id = req.params.id;
    try {
        let product = await Products.findById(id)
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message: 'Product not found'});
        }
    }catch(error){
        res.status(500).json({message: 'Error'})
    }
})
export default router;