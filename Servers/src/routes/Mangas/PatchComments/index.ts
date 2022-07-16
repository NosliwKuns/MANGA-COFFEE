import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';

const router = Router();


router.put('/:id', async(req, res, next)=>{
    const updates = req.body
    const {id} = req.params;
    try {          
        await Manga.findByIdAndUpdate((id), {$push:{comments:[updates]}})
        let otro: any = await Manga.find({_id:id})
        res.status(200).json(otro[0].comments)
    } catch (error) {
        next(error)
    }
})

export default  router;