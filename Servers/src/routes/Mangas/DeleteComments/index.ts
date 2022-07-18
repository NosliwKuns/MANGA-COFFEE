import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';

const router = Router();


router.delete('/deletecomments/comments/', async(req, res, next)=>{
console.log('INGRESA?', )
    const {id, mangaId} = req.query;
    try {
        const manga: any = await Manga.findById(mangaId);
        console.log('MANGAAA', manga)
        console.log('MANGA.COMMENTS', manga.comments)
        const deleted = await manga.comments.filter((c: any) => c._id.toString() !== id)
        console.log('DELETEEEEED', deleted);
        const newComments = await Manga.findByIdAndUpdate({_id: mangaId}, {comments: deleted});
        console.log('NEW COMMENTSSSS', newComments);       
        // const comments = await Manga.findById(id, ['comments'])
        console.log('COMMENTSSSS', newComments);
        
        res.status(200).json(newComments);
    } catch (error) {
        next(error)
    }
})


export default  router;