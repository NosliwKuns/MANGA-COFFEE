const { Router } = require('express');
const GetByName = require('./Mangas/GetByName/index');
const PostManga = require('./Mangas/PostManga/index');
const GetFindAll = require('./Mangas/GetFindAll/index');
const GetById = require('./Mangas/GetById/index');
const DeleteById = require('./Mangas/DeleteById/index');


const router = Router();

router.use('/manga', GetFindAll);
router.use('/manga', GetById);
router.use('/manga', GetByName);
router.use('/manga', PostManga);
router.use('/manga', DeleteById);



module.exports = router;