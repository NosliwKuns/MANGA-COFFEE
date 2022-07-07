import  { Router } from'express';
import  Manga from '../../../models/Manga.js';
const router = Router();

router.post('/', async(req:any, res:any, next:any) => { 
    const {title, genres, cover_image, description, mangas, rating, comments} = req.body
    try {  
        const manga = new Manga({title, genres, cover_image, description, mangas, rating, comments})
        let newmanga = await manga.save()
        res.status(200).json(newmanga)
    } catch (error) {
        next(error)
    }
})

export default router;