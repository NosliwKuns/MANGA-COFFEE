import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();

router.get('/search', async(req, res, next) => {   
    try { 
        let {name , rating, page, search } = req.query
        let sortBy = {}
        let value = Number(name)

        if(name) {
            sortBy = {title:value}
        }
        if(rating){
            value = Number(rating)
            sortBy = {rating:value}
        }
        if(!value) {
            sortBy = {title:1}
    }
        const mangas = await Manga.paginate({
            title: { $regex: '.*' + search + '.*', $options: 'i' },
            },{
            page:Number(page),
            limit:12,
            select: ["title", "genres", "rating" ,"cover_image"],
            sort:sortBy
            } )
        res.status(200).json(mangas)
        } catch (error) {
        next(error)
    }
})

export default router;