import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();


router.get('/genres', async (_req, res, next)=>{

    try{
        const filters= await Manga.find();
        const data : Array<string> = filters.flatMap(e => e.genres); 
        const dataArr = new Set(data);
        const genres : Array<string> = [...dataArr];
       
        res.status(200).json(genres)
    }catch (error) {
        next(error);
    }

    
})

export default router;