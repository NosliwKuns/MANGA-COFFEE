const { Router } = require('express');
const router = Router();
const Manga = require('../../../models/Manga.js')

router.get('/', async(req, res, next) => {    
    try { 
        const mangas = await Manga.find().lean()
        res.status(200).json(mangas)
    } catch (error) {
        next(error)
    }
})

module.exports = router;