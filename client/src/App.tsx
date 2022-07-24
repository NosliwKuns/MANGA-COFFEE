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
import SideBar from './components/RightSide/SideBar';
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


axios.defaults.baseURL = "http://localhost:5000/api/manga";

function App() {

  const [ appear, setAppear ] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const localUser:any  = localStorage.getItem('copySliceUser')
  const [product, setProduct] = useLocalStorage('test', []);
  const user = JSON.parse(localUser);
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState<any>(searchParams.get("page") || 1);
  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  
  const res = useFetch(
    query || page || genre ? `?limit=12&search=${query}&page=${page}&genres=${genre}` : ""
  );
  console.log(res, 'yepi')

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
      <SearchAndFilter 
        appear={appear}
        setAppear={setAppear}
        setGenre={setGenre}
        setPage={setPage}
        setQuery={setQuery}
      />
      <div className="three">
        <UserButtons product={product} setProduct={setProduct}/>
      </div>
      <SideBar />
      <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<DiscoverHome/>} />
        <Route path="/shop" element={<Shop product={product} setProduct={setProduct}/>} />
        <Route path="/mangas" element={
          <CatalogMangas
            setPage={setPage}
            query={query}
            genre={genre}
            setSearchParams={setSearchParams}
            res={res}
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
      </Routes>
      </AnimatePresence>
      <div className="six">
        <User/>
        <Chat/>
      </div>
    </div>
  )
}

export default App
