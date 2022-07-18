import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';

const router = Router();


router.put('/deletecomment/:id', async(req, res, next)=>{
    const _id = req.body
    const {id} = req.params;
    try {          
        await Manga.findByIdAndUpdate((id),{$pull:_id})
        res.send('Item Deleted!');
    } catch (error) {
        next(error)
    }
})


export default  router;