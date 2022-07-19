import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';

const router = Router();


router.delete('/deletecomments/comments/', async(req, res, next)=>{
    const {id, mangaId} = req.query;
    try {
        const manga: any = await Manga.findById(mangaId);
        const deleted = await manga.comments.filter((c: any) => c._id.toString() !== id)
        await Manga.findByIdAndUpdate({_id: mangaId}, {comments: deleted});
        const update: any = await Manga.findById(mangaId);      
        res.status(200).json(update);
    } catch (error) {
        next(error)
    }
})


export default  router;