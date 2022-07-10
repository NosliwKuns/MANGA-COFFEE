import {Router} from 'express'
import Products from '../../../models/Products/index';
const router = Router();
 router.get('/', async(req, res, next) => {
    const id = req.query.id;
    try {
        let product = await Products.findById(id)
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})

export default router;