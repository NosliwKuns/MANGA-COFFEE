import  { Router } from'express';
import  Manga from '../../../models/Manga.js';
const router = Router();

router.post('/', async(req:any, res:any, next:any) => { 
    const {title, genres, image_backgraund, description, chapters} = req.body
    try {  
        const manga = new Manga({title, genres, image_backgraund, description, chapters})
        let newmanga = await manga.save()
        res.status(200).json(newmanga)
    } catch (error) {
        next(error)
    }
})

export default router;