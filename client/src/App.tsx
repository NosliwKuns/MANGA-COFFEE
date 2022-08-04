import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { loginUser } from './features/user/userSlice';
import { useAppDispatch } from './app/hooks';
import { useEffect, useState, useRef, createContext } from 'react'
import SearchAndFilter from './components/SearchAndFilter';
import ProductDetail from './components/ProductDetail';
import Favorites from './components/User/Favorites';
import CatalogMangas from './components/CatalogMangas';
import Verificate from './components/Verificate';
import Detail from './components/Detail/Detail';
import UserDetail from './components/UseDetail';
import Logeo from './components/Logeo/Logeo';
import SideBar from './components/SideBar';
import User from './components/User/User';
import Chat from './components/Chat/Chat';
import Shop from './components/Shop';
import axios from "axios";
import './App.scss';
import useFetch from './app/customHooks/useFetch';
import { AnimatePresence } from 'framer-motion';
import RightSide from './components/RightSide';
import DiscoverHome from './components/DiscoverHome/index';
import BuyProduct from './components/BuyProduct';
import Categories from './components/Categories/Categories';
import SelectedCategories from './components/Categories/SelectedCategories';
import ReadManga from './components/ReadManga/index';
import useLocalStorage from './app/customHooks/useLocalStorage';
import RenamePassword from './components/Registration/RenamePassword/email';
import RenamePass from './components/Registration/RenamePassword/password';
import BuyShopping from './components/BuyProduct/BuyShopping';
import MessageAdmin from './components/Admin/usersTable/Celdas/MessageAdmin';
import WishList from './components/User/WishList/WishList'
import DetailEment from './components/UseDetail/HistoryBuy/DetailEment';
import AboutUs from './components/SideBar/AboutUs/AboutUs'
import SiOrNot from './components/Registration/SiOrNot';
import { MangaContextProvider } from './context/mangaContex';
import { ProductContext, ProductContextProvider } from './context/productContex';

/* import { MangaContextType } from './Interfaces/mangas';

export const MangaContext = createContext<MangaContextType | null>(null); */

axios.defaults.baseURL = "https://manga-coffee.herokuapp.com/api";

function App() {

  const dispatch = useAppDispatch()
  const localUser:any  = localStorage.getItem('copySliceUser')
  const user = JSON.parse(localUser);
  const location = useLocation();
  const [isActive, setIsActive] = useState<boolean>(false);

  // ---------- states to be used with both mangas and store -------------//

  const [searchParams, setSearchParams] = useSearchParams();
  
  //------------------- states to be used with mangas ---------------------//
  
  /* const [colorF, setColorF] = useLocalStorage('colorFM', [])
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState<any>(searchParams.get("page") || 1);
  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  const [sort, setSort] = useState<string>(searchParams.get("sort") || "") */
  
  //------------------- states to be used in the store ---------------------//
  
  /* const [colorFShop, setColorShop] = useLocalStorage('colorFMShop', [])
  const [pageShop, setPageShop] = useState<any>(searchParams.get("page") || 1);
  const [genreShop, setGenreShop] = useState(searchParams.get("category") || "");
  const [queryShop, setQueryShop] = useState(searchParams.get("q") || "");
  const [shopSort, setshopSort] = useState<string>(searchParams.get("sort") || "") */
  
  /* const res = useFetch(
    query || page || genre ? `/manga?limit=12&search=${query}&page=${page}&genres=${genre}&sort=${sort}` : ""
  ); */
  /* const resShop = useFetch(
    queryShop || pageShop || genreShop ? `/products?limit=12&search=${queryShop}&page=${pageShop}&category=${genreShop}&sort=${shopSort}` : ""
  ); */

  const [clickBuy, setClickBuy] = useState("")
  

  useEffect(()=>{
    if(user){
    dispatch(loginUser(user))
    window.localStorage.setItem("pagAdmin","1")
    }
  },[])

  return (
    <MangaContextProvider>
    <ProductContextProvider>
    <div className="App">
      <SideBar 
      /* setPageShop={setPageShop}
      setGenreShop={setGenreShop}
      setQueryShop={setQueryShop} */
      /* setColorF={setColorF} */
      isActive={isActive}
      setIsActive={setIsActive}
      />
      
      <div className="five">
        <SearchAndFilter 
          /* setGenre={setGenre}
          setPage={setPage}
          setQuery={setQuery}
          setColorF={setColorF} */
          /* setQueryShop={setQueryShop} */
          /* res={res} */
          /* resShop={resShop} */
          setClickBuy={setClickBuy}
          isActive={isActive}
          setIsActive={setIsActive}
        />

        <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DiscoverHome /* res={res} */ />} />
          <Route path="/shop" element={
            <Shop 
              /* product={product} 
              setProduct={setProduct}  */
              /* 
              resShop={resShop}
              pageShop={pageShop}
              setPageShop= {setPageShop}
              genreShop= {genreShop}
              queryShop= {queryShop}
              setSearchParams={setSearchParams}
              setGenreShop={setGenreShop}
              setQueryShop={setQueryShop} 
              colorFShop={colorFShop}
              setColorShop={setColorShop}
              shopSort={shopSort}
              setshopSort={setshopSort} */
            />} 
          />
          <Route path="/mangas" element={
            <CatalogMangas
              /* setGenre={setGenre}
              setPage={setPage}
              query={query}
              genre={genre} */
              setSearchParams={setSearchParams}
              /* res={res} */
              /* colorF={colorF}
              setColorF={setColorF}
              page={page}
              sort={sort}
              setSort={setSort} */
            />} 
          />
          <Route path="/mangas/detail/:id" element={<Detail/>} />
          <Route path='/logeo' element={<Logeo/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/userDetail' element={<UserDetail/>}/>
          <Route path='/mangas/:title/:chapter/:id' element={<ReadManga/>}/>
          <Route path='/user/fav' element={<Favorites/>} />
          <Route path='/user/wishlist' element={<WishList/>} />
          <Route path='/user/cart' element={<h1>I'm the Cart component</h1>} />
          <Route path='/categories' element={<Categories/>} />
          <Route path='/newreleases' element={<h1>I'm the New Releases component</h1>} />
          <Route path='/popular' element={<h1>I'm the Popular component</h1>} />
          <Route path='/history' element={<h1>I'm the History component</h1>} />
          <Route path="/product/:id" element={<ProductDetail /* product={product} setProduct={setProduct} */ setClickBuy={setClickBuy}/>} />
          <Route path="/categories/:genre" element={<SelectedCategories/>} />
          <Route path='/buyProduct' element={<BuyProduct clickBuy={clickBuy} /* setProduct={setProduct} *//>}/>
          <Route path='/verificateUser/:id' element={<Verificate/>}/>
          <Route path='/rename' element={<RenamePassword/>}/>
          <Route path='/rename/password/:idUser' element={<RenamePass/>}/>
          <Route path='/shoppingTime' element={<BuyShopping/>}/>
          <Route path='/admin/msg/:idUser' element={<MessageAdmin/>}/>
          <Route path='/detailElementBuy/:idElement' element={<DetailEment/>}/>
          <Route path='/aboutUs' element={<AboutUs/>}/>
        </Routes>
        </AnimatePresence>
      </div>
      <RightSide /* product={product} setProduct={setProduct} */ setClickBuy={setClickBuy}/>
      <Chat />
    </div>
    </ProductContextProvider>
    </MangaContextProvider>
  )
}

export default App
