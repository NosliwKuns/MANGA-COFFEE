import { Router } from 'express';
import GetByName from './Mangas/GetByName/index';
import PostManga from './Mangas/PostManga/index';
import GetFindAll from './Mangas/GetFindAll/index';
import GetById from './Mangas/GetById/index';
import DeleteById from './Mangas/DeleteById/index';
import PostUserCreated from './user/PostUserCreated/index';
import PostUserinit from './user/PostUserinit/index';
import GetByIdUser from './user/GetByIdUser/index'


const router = Router();

router.use('/manga', GetFindAll);
router.use('/manga', GetByName);
router.use('/manga', GetById);
router.use('/manga', PostManga);
router.use('/manga', DeleteById);

router.use('/user', PostUserCreated);
router.use('/user', PostUserinit);
router.use('/user', GetByIdUser);




export default router;