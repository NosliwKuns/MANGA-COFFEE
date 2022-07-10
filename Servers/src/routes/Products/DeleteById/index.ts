import { Router } from 'express';
import Products from '../../../models/Products/index';

const router = Router();

router.delete('/:id', async(req, res, next) => {
    const {id} = req.params;
    try {
        let deleteproduct = await Products.findByIdAndDelete(id)
        console.log(deleteproduct)
        res.status(200).json(deleteproduct)
    } catch (error) {
        next(error)
    }
});
