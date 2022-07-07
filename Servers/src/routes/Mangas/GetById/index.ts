import { Router } from 'express';
import Manga from '../../../models/Manga.js';
const router = Router();

router.get('/:id', async(req, res, next) => {
    console.log('ruta')
    const {id} = req.params;
    try { 
        const manga = await Manga.findById(id).lean()
        res.status(200).json(manga)
    } catch (error) {
        next(error)
    }
})

export default router;