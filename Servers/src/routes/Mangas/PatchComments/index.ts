import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';

const router = Router();


router.put('/:id', async(req, res, next)=>{
    const updates = req.body
    const {id} = req.params;
    try {          
        let patchmanga = await Manga.findByIdAndUpdate((id), {$push:{comments:[updates]}})
        console.log(id)
        res.status(200).json(patchmanga)
    } catch (error) {
        next(error)
    }
})

export default  router;