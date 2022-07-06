const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    console.log('ruta')
    const {name} = req.query;
    try {        
        res.status(200).send('bienvenido a Manga Coffe ' + name)
    } catch (error) {
        next(error)
    }
})

module.exports = router;