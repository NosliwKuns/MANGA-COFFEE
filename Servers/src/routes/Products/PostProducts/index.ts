import {Router} from 'express';
import Products from '../../../models/Products/index';

const router = Router();
router.post('/', async(req, res) => {
    const {name, description, product_image, stock, price, category, rating, comments} = req.body;
    try {
        const product = await Products.create({name, description, product_image, price, stock, category, rating, comments});
        res.json(product);
    } catch (error) {
        res.status(500).json("error")
    }
})

export default router;