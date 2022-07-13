import {Router} from 'express';
import Products from '../../../models/Products/index';
const router = Router();
//todavia en prueba 
router.get('/cat', async(req, res, next) => {
 const {category} = req.query;
    try {
        const product = await Products.find({category});
        res.json(product);
    } catch (error) {
        res.status(500).json("error")
    }

})

export default router;