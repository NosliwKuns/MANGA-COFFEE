import {Router} from 'express';
import Products from '../../../models/Products/index';

const router = Router();
router.post('/', async(req, res) => {
    const {name, description, product_image, price, rating, comments, category} = req.body;
    try {
        let product = await Products.create({name, description, product_image, price, rating, comments, category})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router;