const { Router } = require('express');
const GetByName = require('./Mangas/GetByName/index');


const router = Router();


router.use('/manga', GetByName);

module.exports = router;