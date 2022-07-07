import { Router } from 'express';
import Manga from '../../../models/Manga.js';
const router = Router();

router.get('/', async(_req, res, next) => {    
    try { 
        const mangas = await Manga.find({}, ["title", "image_backgraund", "genres"])
        res.status(200).json(mangas)
    } catch (error) {
        next(error)
    }
})

export default router;