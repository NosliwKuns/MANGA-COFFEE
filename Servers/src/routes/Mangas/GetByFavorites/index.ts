import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();

router.get('/favoritesbyid/fav', async(req, res, next) => {
    console.log('ruta')
    const ids = req.body;
    let manga={}
    
    try {              
            manga = await Manga.paginate({_id:ids.favorites},
                                {
                                limit:  12,
                                select: ["title", "genres", "rating" ,"cover_image"],
                                sort:{title:1}
                            })
            res.status(200).json(manga)
            } catch (error) {
                next(error)
            }
        })

        export default router;
