import {Router} from 'express';
import Products from '../../../models/Products/index';
const router = Router();
//todavia en prueba 
router.get('/cat', async(req, res, next) => {
    const {category}=req.query;
    
    let categorias:any=[]

    try{
        let products = await Products.find({category:category})
        products.forEach(product => {
            if(categorias.indexOf(product.category)===-1){
                categorias.push(product.category)
            }
        }
        )
        res.status(200).json(categorias)
    }catch(error){
        res.status(500).json(error)
    }
}
)

export default router;