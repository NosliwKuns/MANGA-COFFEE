import { Router } from 'express';
import Manga from '../../../models/Manga.js';
const router = Router();

router.delete('/:id', async(req, res, next) => { 
    const {id} = req.params;
    try {          
        let deletemanga = await Manga.findByIdAndDelete(id)
        console.log(deletemanga)
        res.status(200).json(deletemanga)
    } catch (error) {
        next(error)
    }
})

export default  router;