const { Router } = require('express');
const router = Router();
const Manga = require('../../../models/Manga.js')

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

module.exports = router;