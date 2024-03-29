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
import AdminPostSendMailFindAll from './Users/AdminPostSendMailFindAll/index';
import GetConfirmarCuenta from './Users/GetConfirmarCuenta/index';
import DisabledUser from './Users/DisabledUser/index';
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
import PostRating from './Mangas/postRating/index';
import DeleteItemsWishlistProducts from './Products/DeleteItemsWishlistProducts/index';
import PostResetPass from './Users/PostResetPass/index';
import PutResetPass from './Users/PutResetPass/index';
import PutResetUser from './Users/PutResetUser/index';
import AdminGetFinAllUser from './Users/AdminGetFinAllUser/index';
import AdminPutAdminUser from './Users/AdminPutAdminUser/index';
import AdminPutBlockUser from './Users/AdminPutBlockUser/index';
import AdminPutStatusUser from './Users/AdminPutStatusUser/index';
import PutStock from './Products/PutStock/index';
import PutRating from './Products/PutRating/index';
import GetWishList from './Products/GetWishList/index';
import AdminPostSendMailUser from './Users/AdminPostSendMailUser/index';
import AdminAddChapterManga from './Mangas/AdminAddChapterManga/index';
import AdminGetFindAllForFilters from './Users/AdminGetFindAllForFilters/index';
import PostCart from './Users/PostCart/index'
import GetCart from './Users/GetCart/index'
import AdminGetFindAllHistoryBuy from './Users/AdminGetFindAllHistoryBuy/index';
import AdminGetByIdHistoryBuy from './Users/AdminGetByIdHistoryBuy/index';
import PutCart from './Users/PutCart/index'
import DeleteCart from './Users/DeleteCart/index'
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
router.use('/manga', PostRating);
router.use('/manga', AdminAddChapterManga);

router.use('/user', DisabledUser);
router.use('/user', AdminPostSendMailFindAll);
router.use('/user', DeleteCart);
router.use('/user', DeleteFavorites);
router.use('/user', PostUserCreated);
router.use('/user', PostUserinit);
router.use('/user', GetByIdUser);
router.use('/user', PutByIdUser);
router.use('/user', PutByIdUserFav);
router.use('/user', GetCart);
router.use('/user', GetMangaFavoUser);
router.use('/user', GetConfirmarCuenta);
router.use('/user', PostCart);
router.use('/user', PutCart);
router.use('/user', PostResetPass);
router.use('/user', PutResetPass);
router.use('/user', PutResetUser);
router.use('/user', AdminGetFinAllUser);
router.use('/user', AdminPutAdminUser);
router.use('/user', AdminPutBlockUser);
router.use('/user', AdminPutStatusUser);
router.use('/user', AdminPostSendMailUser);
router.use('/user', AdminGetFindAllForFilters);
router.use('/user', AdminGetByIdHistoryBuy);
router.use('/user', AdminGetFindAllHistoryBuy);

router.use('/products', GetWishList);
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
router.use('/products', DeleteItemsWishlistProducts);
router.use('/products', PutStock);
router.use('/products', PutRating);

export default router;