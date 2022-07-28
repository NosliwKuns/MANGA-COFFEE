import {Router} from "express"
import Products from "../../../models/Products/index"
const router = Router();
 router.post('/comments/:id', async(req, res) => {
    const id = req.params.id;
        const newcomments = req.body;
    try {
        let product = await Products.findById(id);
    
        if(product){
            product.comments.push(newcomments);
            await product.save(newcomments);
            res.json(product);
        }else{
            res.status(404).json({message: 'Product not found'});
        }
    }catch(error){
        res.status(500).json({message: 'Error'})
    }
})

export default router;