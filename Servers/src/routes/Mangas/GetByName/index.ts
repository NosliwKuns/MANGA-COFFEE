import { Router } from 'express';
import Manga from '../../../models/Manga.js';
const router = Router();

router.get('/', async(req, res, next) => {
    console.log('ruta')
    const {name} = req.query;
    try { 
        const manga = await Manga.find({name}).lean()
        res.status(200).json(manga)
    } catch (error) {
        next(error)
    }
})

export default router;