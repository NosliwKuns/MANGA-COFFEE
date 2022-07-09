import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();

router.get('/search', async(req, res, next) => {
    const {name} = req.query;
    try { 
        const manga = await Manga.find({title: { $regex: '.*' + name + '.*', $options: 'i' } }, ["title", "genres", "cover_image"])
        res.status(200).json(manga)
    } catch (error) {
        next(error)
    }
})

export default router;