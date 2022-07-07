import { Router } from 'express';
import GetByName from './Mangas/GetByName/index';
import PostManga from './Mangas/PostManga/index';
import GetFindAll from './Mangas/GetFindAll/index';
import GetById from './Mangas/GetById/index';
import DeleteById from './Mangas/DeleteById/index';


const router = Router();

router.use('/manga', GetByName);
router.use('/manga', GetFindAll);
router.use('/manga', GetById);
router.use('/manga', PostManga);
router.use('/manga', DeleteById);



export default router;