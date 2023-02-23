import { Router } from 'express';
import Products from '../../../models/Products/index.js';

const router = Router();

router.delete('/:id', async(req, res, next) => {
    const {id} = req.params;
    try {
        await Products.findByIdAndDelete(id);
        res.json({message: 'Product deleted'});
    } catch (error) {
        next(error)
    }
});
export default router;
