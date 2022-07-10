import {Router} from 'express';
import Products from '../../../models/Products/index';

const router = Router();
router.post('/', async(req, res) => {
    const {name, description, image, price, stock, rating, comments} = req.body;
    try {
        if(!name || !description || !image || !price || !stock || !rating || !comments){
            res.status(400).json({message: 'Please fill all the fields'})
        }else{
            let newproduct = await Products.create({name, description, image, price, stock, rating, comments})
            res.status(200).json(newproduct)
        }
    } catch (error) {
        res.status(500).json("error")
    }
})

export default router;