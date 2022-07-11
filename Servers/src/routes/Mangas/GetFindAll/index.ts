import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();

router.get('/', async(req, res, next) => {   
    try { 
        let {name , rating, genre, search } = req.query 
        let page = req.query.page || 1
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

        var mutate;

        if(!genre && !search) {
            mutate = {};
        } else if (!genre) {
            mutate = { title: { $regex: '.*' + search + '.*', $options: 'i' } }
        } else if (!search) {
            mutate = { genres: genre }
        }

        const mangas = await Manga.paginate(mutate,{
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