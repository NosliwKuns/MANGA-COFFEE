const { Router } = require('express');
const router = Router();
const Manga = require('../../../models/Manga.js')

router.delete('/:id', async(req, res, next) => { 
    const {id} = req.params;
    try {          
        let deletemanga = await Manga.findByIdAndDelete(id)
        console.log(deletemanga)
        res.status(200).json(deletemanga)
    } catch (error) {
        next(error)
    }
})

module.exports = router;