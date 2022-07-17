import { Router } from 'express';
import GetByName from './Mangas/GetByName/index';
import PostManga from './Mangas/PostManga/index';
import GetFindAll from './Mangas/GetFindAll/index';
import GetById from './Mangas/GetById/index';
import DeleteById from './Mangas/DeleteById/index';
import FilterByGenre from './Mangas/FilterByGenre/index';
import PatchComments from './Mangas/PatchComments/index';
import PostUserCreated from './Users/PostUserCreated/index';
import PostUserinit from './Users/PostUserinit/index';
import GetByIdUser from './Users/GetByIdUser/index';
import PutByIdUser from './Users/PutByIdUser/index';
import PutByIdUserFav from './Users/PutByIdUserFav/index';
import GetMangaFavoUser from './Users/GetMangaFavoUser/index';
import DeleteFavorites from './Users/DeleteFavorites/index';
import getEmail from './Users/getEmail/index';
import DeleteUsers from './Users/DeleteUsers/index';
import GetConfirmarCuenta from './Users/GetConfirmarCuenta/index';
import DeleteByIdProducts from './Products/DeleteByIdProducts/index';
import FilterByIdProducts from './Products/FilterByIdProducts/index';
import FilterByNameProducts from './Products/FilterByNameProducts/index';
import GetFindAllProducts from './Products/GetFindAllProducts/index';
import PostProducts from './Products/PostProducts/index';
import FilterByCategory from './Products/FilterByCategory/index';
import PutProducts from './Products/PutProducts/index';
import PostCommentsProducts from './Products/PostCommentsProducts/index';
import PostBuyStripe from './Products/PostBuyStripe/index';
import AddWishListProducts from './Products/AddWishListProducts/index';
import PutManga from './Mangas/PutManga/index';
import GetByFavorites from './Mangas/GetByFavorites/index';
import DeleteComments from './Mangas/DeleteComments/index'

const router = Router()

router.use('/manga', FilterByGenre);
router.use('/manga', GetFindAll);
router.use('/manga', GetByName);
router.use('/manga', GetById);
router.use('/manga', PostManga);
router.use('/manga', DeleteById);
router.use('/manga', DeleteComments);
router.use('/manga', PatchComments);
router.use('/manga', PutManga);
router.use('/manga', GetByFavorites);

router.use('/user', getEmail );
router.use('/user', DeleteFavorites);
router.use('/user', DeleteUsers);
router.use('/user', PostUserCreated);
router.use('/user', PostUserinit);
router.use('/user', GetByIdUser);
router.use('/user', PutByIdUser);
router.use('/user', PutByIdUserFav);
router.use('/user', GetMangaFavoUser);
router.use('/user', GetConfirmarCuenta);

router.use('/products', DeleteByIdProducts);
router.use('/products', FilterByIdProducts);
router.use('/products', FilterByNameProducts);
router.use('/products', GetFindAllProducts);
router.use('/products', PostProducts);
router.use('/products', FilterByCategory);
router.use('/products', PutProducts);
router.use('/products', PutProducts);
router.use('/products', PostCommentsProducts);
router.use('/products', PostBuyStripe);
router.use('/products', AddWishListProducts);

export default router;