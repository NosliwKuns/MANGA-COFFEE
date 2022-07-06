const { Router } = require('express');
const router = Router();
const Manga = require('../../../models/Manga.js')

router.post('/', async(req, res, next) => { 
    const {title, genres, image_backgraund, description, chapters} = req.body
    try {  
        const manga = new Manga({title, genres, image_backgraund, description, chapters})
        let newmanga = await manga.save()
        res.status(200).json(newmanga)
    } catch (error) {
        next(error)
    }
})

module.exports = router;