import {Router} from 'express';
import Products from '../../../models/Products/index';
const router = Router();

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {name, description, product_image, price, category, rating, comments} = req.body;
    try {
      await Products.findByIdAndUpdate(id, {
        name,
        description,
        product_image,
        price,
        category,
        rating,
        comments
      });
      // Send response in here
      res.send('Item Updated!');

    } catch(error) {
        res.send(400).send('Server Error');
    }
});
export default router;