import {Router} from 'express';
import Products from '../../../models/Products/index';
const router = Router();

    router.get('/name', async(req, res) => {
        const {name} = req.query;
        try
        {
            if(name)
            {
                let product = await Products.find({name: {$regex: name, $options: 'i'}})
                res.status(200).json(product)
            }
            else
            {
                let product = await Products.find()
                res.status(200).json(product)
            }
        }
        catch(error)
        {
            res.status(500).json(error)
        }
    })
export default router;
    