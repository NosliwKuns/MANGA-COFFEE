import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();

router.get('/favoritesbyid/fav', async(req, res, next) => {
    console.log('ruta')
    const ids = req.body;
    let manga={}
    
    try {              
            manga = await Manga.find({_id:ids.favorites})
                                .select (["title", "genres", "rating" ,"cover_image"])
            res.status(200).json(manga)
            } catch (error) {
                next(error)
            }
        })

export default router;