import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { loginUser } from './features/user/userSlice';
import { useAppDispatch } from './app/hooks';
import { useEffect, useState } from 'react'
import Registration from './components/Registration/Registration';
import SearchAndFilter from './components/SearchAndFilter';
import ProductDetail from './components/ProductDetail';
import Favorites from './components/User/Favorites';
import UserButtons from './components/UserButtons';
import CatalogMangas from './components/CatalogMangas';
import Verificate from './components/Verificate';
import Detail from './components/Detail/Detail';
import UserDetail from './components/UseDetail';
import Logeo from './components/Logeo/Logeo';
import SideBar from './components/SideBar';
import User from './components/User/User';
import Chat from './components/Chat/Chat';
import Home from './components/Home';
import Shop from './components/Shop';
import axios from "axios";
import Cards from './components/CatalogMangas/Cards';
import './App.scss';
import useFetch from './app/customHooks/useFetch';
import { AnimatePresence } from 'framer-motion';
import RightSide from './components/RightSide';
import DiscoverHome from './components/DiscoverHome/index';
import BuyProduct from './components/BuyProduct';

import LeftSide from './components/RightSide';
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


axios.defaults.baseURL = "https://manga-coffee.herokuapp.com/api";

function App() {

  const [ appear, setAppear ] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const localUser:any  = localStorage.getItem('copySliceUser')
  const [product, setProduct] = useLocalStorage('test', []);
  const user = JSON.parse(localUser);
  const location = useLocation();

  const [colorF, setColorF] = useLocalStorage('colorFM', [])

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState<any>(searchParams.get("page") || 1);
  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  const [sort, setSort] = useState<string>(searchParams.get("genre") || "")
  
  const [pageShop, setPageShop] = useState<any>(searchParams.get("page") || 1);
  const [genreShop, setGenreShop] = useState(searchParams.get("genre") || "");
  const [queryShop, setQueryShop] = useState(searchParams.get("q") || "");
  
  const res = useFetch(
    query || page || genre ? `/manga?limit=12&search=${query}&page=${page}&genres=${genre}&sort=${sort}` : ""
  );
  const resShop = useFetch(
    queryShop || pageShop || genreShop ? `/products?limit=12&search=${queryShop}&page=${pageShop}&category=${genreShop}` : ""
  );
  

  useEffect(()=>{
    if(user){
    dispatch(loginUser(user))
    window.localStorage.setItem("pagAdmin","1")
    }
  },[])

  return (
    <div className="App">
      {/* <div className="one">
        <h2 onClick={() => window.location.replace('/')}>MANGA <span style={{color: '#EA374B'}} color={'red'}>COFFEE</span></h2>
        <h3 onClick={() => window.location.replace('/')}>MC</h3>
      </div> */}
      <SideBar />
      
      <div className="five">
        <SearchAndFilter 
          appear={appear}
          setAppear={setAppear}
          setGenre={setGenre}
          setPage={setPage}
          setQuery={setQuery}
          setColorF={setColorF}
        />

        <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DiscoverHome res={res} />} />
          <Route path="/shop" element={
            <Shop 
            product={product} 
            setProduct={setProduct} 
            resShop={resShop}
            pageShop={pageShop}
            setPageShop= {setPageShop}
            genreShop= {genreShop}
            queryShop= {queryShop}
            setSearchParams={setSearchParams}
            setGenreShop={setGenreShop}
            setQueryShop={setQueryShop} 
            colorF={colorF}
            setColorF={setColorF}/>} />
          <Route path="/mangas" element={
            <CatalogMangas
              setGenre={setGenre}
              setPage={setPage}
              query={query}
              genre={genre}
              setSearchParams={setSearchParams}
              res={res}
              colorF={colorF}
              setColorF={setColorF}
              page={page}
              sort={sort}
              setSort={setSort}
            />} 
          />
          {/* <Route path="/mangas/search" element={<CatalogMangas res={res}/>} /> */}
          <Route path="/mangas/detail/:id" element={<Detail/>} />
          <Route path='/logeo' element={<Logeo/>}/>
          <Route path='/registration' element={<Registration/>}/>
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
          <Route path="/product/:id" element={<ProductDetail product={product} setProduct={setProduct}/>} />
          <Route path="/categories/:genre" element={<SelectedCategories/>} />
          <Route path='/buyProduct/:idProduct' element={<BuyProduct/>}/>
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
      <RightSide product={product} setProduct={setProduct}/>
      <Chat />
    </div>
  )
}

export default App
