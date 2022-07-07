import { Router } from 'express';
import Manga from '../../../models/Manga.js';
const router = Router();

router.get('/search', async(req, res, next) => {
    console.log('ruta')
    const {name} = req.query;
    try { 
        const manga = await Manga.find({title: { $regex: '.*' + name + '.*', $options: 'i' } }, ["title", "image_backgraund"])
        res.status(200).json(manga)
    } catch (error) {
        next(error)
    }
})

export default router;