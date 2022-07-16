import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { loginUser } from './features/user/userSlice';
import { useAppDispatch } from './app/hooks';
import { useEffect, useState } from 'react'
import Registration from './components/Registration/Registration';
import SearchAndFilter from './components/SearchAndFilter';
import ProductDetail from './components/ProductDetail';
import Favorites from './components/User/Favorites';
import UserButtons from './components/UserButtons';
import SearchManga from './components/SearchManga';
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
import Cards from './components/Home/Cards';
import './App.scss';
import useFetch from './app/customHooks/useFetch';
import { AnimatePresence } from 'framer-motion';
import RightSide from './components/RightSide';
import BuyProduct from './components/ProductDetail/BuyProduct';

axios.defaults.baseURL = "http://localhost:5000/api/manga";

function App() {

  const [ appear, setAppear ] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const localUser:any  = localStorage.getItem('copySliceUser')
  const rerender = useState<string>(localUser)
  const user = JSON.parse(localUser);
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState<any>(searchParams.get("page") || 1);
  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  
  const res = useFetch(
    query || page || genre ? `?search=${query}&page=${page}&genres=${genre}` : ""
  );
  console.log(res, 'yepi')

  useEffect(()=>{
    if(user){
     dispatch(loginUser(user))
    }

  },[])

  return (
    <div className="App">
      <div className="one">
        <h2>MANGA <span style={{color: '#EA374B'}} color={'red'}>COFFEE</span></h2>
        <h3>MC</h3>
      </div>
      <SearchAndFilter 
        appear={appear}
        setAppear={setAppear}
        setGenre={setGenre}
        setPage={setPage}
        setQuery={setQuery}
      />
      <div className="three">
        <UserButtons/>
      </div>
      <RightSide />
      <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Home 
            res={res}
            query={query}
            genre={genre}
            setPage={setPage} 
            setSearchParams={setSearchParams}
          />} 
        />
        <Route path="/shop" element={
          <Shop 
 
          />} 
        />
        <Route path="/search" element={<Cards res={res}/>} />
        <Route path="/search" element={ <h1>dimee</h1>  } />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path='/logeo' element={<Logeo/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/userDetail' element={<UserDetail/>}/>
        {/* <Route path='/chapter/:id' element={<Leer/>}/> */}
        <Route path='/user/fav' element={<Favorites/>} />
        <Route path='/user/wishlist' element={<h1>I'm the Wish List component</h1>} />
        <Route path='/user/cart' element={<h1>I'm the Cart component</h1>} />
        <Route path='/categories' element={<h1>I'm the Categories component</h1>} />
        <Route path='/newreleases' element={<h1>I'm the New Releases component</h1>} />
        <Route path='/popular' element={<h1>I'm the Popular component</h1>} />
        <Route path='/history' element={<h1>I'm the History component</h1>} />

        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path='/buyProduct/:idProduct' element={<BuyProduct/>}/>
       

        <Route path='/verificateUser/:id' element={<Verificate/>}/>
      </Routes>
      </AnimatePresence>
      <div className="six">
        <div><User/></div>
        <div><Chat/></div>
      </div>
    </div>
  )
}

export default App
