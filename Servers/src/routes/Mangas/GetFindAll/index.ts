import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();

router.get('/', async(req, res, next) => {   
    try { 
        let page = req.query.page || 0
        let {name , rating } = req.query
        const mgPerPage = 12
        let sortBy = {}
        let value = Number(name)
            if(name) {
            sortBy = {title:value}
            }
            if(rating){
            value = Number(rating)
            sortBy = {rating:value}
            }else {
            sortBy = {title:1}
            }
            
            const mangas = await Manga.find({}, ["title", "genres", "rating" ,"cover_image"])
            .sort(sortBy)
            .skip(Number(page) * mgPerPage)
            .limit(mgPerPage)
            res.status(200).json(mangas)
        } catch (error) {
        next(error)
    }
})

export default router;