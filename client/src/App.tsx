import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useAppDispatch } from './app/hooks';
import { loginUser } from './features/user/userSlice';
import Home from './components/Home';
import SearchAndFilter from './components/SearchAndFilter';
import SideBar from './components/SideBar';
import Detail from './components/Detail/Detail';
import Logeo from './components/Logeo/Logeo';
import Registration from './components/Registration/Registration';
import User from './components/User/User';
import UserDetail from './components/UseDetail';
import UserButtons from './components/UserButtons';
import Chat from './components/Chat/Chat';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import { fetchAllManga } from './features/manga/mangaSlice';
import SearchManga from './components/SearchManga';
import './App.scss'
import useLocalStorage from './app/useLocalStorage';

function App() {

  const [ appear, setAppear ] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const localUser:any  = localStorage.getItem('copySliceUser')
  const rerender = useState<string>(localUser)
  const user = JSON.parse(localUser);
  const [dataa, setDataa] = useLocalStorage('helpo', '')

  const [fetchedData, setFetchedData] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState<string>('');
  const [genres, setGenres] = useState('');
  const [alph, setAlph] = useState('');
  const [rate, setRate] = useState('');
  const [fetchProducts, setFetchProducts] = useState<any>([]);
  const { mangas, totalPages } = fetchedData;
  
  const API_KEY_M = `http://localhost:5000/api/manga/?page=${pageNumber}&search=${search}&genres=${genres}`
  const API_KEY_P = `http://localhost:5000/api/products?page=${pageNumber}&search=${search}&genre=${genres}&name=${alph}&rating=${rate}`

  useEffect(()=>{
    if(user){
     dispatch(loginUser(user))
    }

    dispatch(fetchAllManga(pageNumber, search, genres))
    // let data : any;
    // (async () => {
    //   data = await fetch(API_KEY_M).then(res => res.json());
    //   let b;
    //   if(!data) {
    //     b = (<h1>Loading</h1>)
    //   } else {
    //     b = data
    //   }
    //   setFetchedData(b);
    //   setDataa(data)
    //   /* let dataP = await fetch(API_KEY_P).then(res => res.json())
    //   setFetchProducts(dataP) */
    // })()
    
  },[pageNumber, search, genres])
  
  console.log(pageNumber, search, genres, 'aqui')

  return (
    <div className="App">
      <div className="one">
        <h2>MANGA COFFEE</h2>
        <h3>MC</h3>
      </div>
      <SearchAndFilter 
        appear={appear}
        setAppear={setAppear}
        setSearch={setSearch}
        setGenres={setGenres}
        setAlph={setAlph}
        setRate={setRate}
      />
      <div className="three">
        {/* <LinkZone /> */}
        <UserButtons/>
      </div>
      <div className="four">
        <div className="side-bar">
        <SideBar/>
        </div>
        <div className="greeting"></div>
      </div>
        
      <Routes>
        <Route path="/" element={
          <Home 
            mangas={mangas} 
            totalPages={totalPages}
            setPageNumber={setPageNumber}
            setAlph={setAlph}
            setRate={setRate}

          />} 
        />
        <Route path="/store" element={
          <Shop 
          fetchProducts={fetchProducts}
          />} 
        />
        <Route path="/search" element={<SearchManga/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path='/logeo' element={<Logeo/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/userDetail' element={<UserDetail/>}/>
        {/* <Route path='/chapter/:id' element={<Leer/>}/> */}
        <Route path='/user/fav' element={<h1>I'm the Favorites component</h1>} />
        <Route path='/user/wishlist' element={<h1>I'm the Wish List component</h1>} />
        <Route path='/user/cart' element={<h1>I'm the Cart component</h1>} />
        <Route path='/categories' element={<h1>I'm the Categories component</h1>} />
        <Route path='/newreleases' element={<h1>I'm the New Releases component</h1>} />
        <Route path='/popular' element={<h1>I'm the Popular component</h1>} />
        <Route path='/history' element={<h1>I'm the History component</h1>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        

      </Routes>
      <div className="six">
        <div><User/></div>
        <div><Chat/></div>
      </div>
    </div>
  )
}

export default App
