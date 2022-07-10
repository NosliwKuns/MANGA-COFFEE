import {Router} from 'express';
import Products from '../../../models/Products/index';
const router = Router();

router.get('/', async(req, res) => {
    try{
        let products = await Products.find({})
        res.status(200).json(products)
    } catch(error){
        res.status(500).json(error)
    }
})
export default router;