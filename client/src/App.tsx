import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'
import './App.scss'
import Home from './components/Home';
import SearchAndFilter from './components/SearchAndFilter';
import SideBar from './components/SideBar';
import Detail from './components/Detail/Detail';
import Logeo from './components/Logeo/Logeo';
import Registration from './components/Registration/Registration';
import User from './components/User/User';
import { useAppDispatch } from './app/hooks';
import { loginUser } from './features/user/userSlice';
import UserDetail from './components/UseDetail';
import UserButtons from './components/UserButtons';

function App() {

  const [ appear, setAppear ] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const localUser:any  = localStorage.getItem('copySliceUser')
  const rerender = useState<string>(localUser)
  const user = JSON.parse(localUser)

  useEffect(()=>{
    if(user){
     dispatch(loginUser(user))
    }
  },[rerender])

  return (
    <div className="App">
      <div className="one">
        <h2>MANGA COFFEE</h2>
        <h3>MC</h3>
      </div>
      <SearchAndFilter 
        appear={appear}
        setAppear={setAppear} />
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
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<h1>I'm the Store component</h1>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path='/logeo' element={<Logeo/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/userDetail' element={<UserDetail/>}/>
        <Route path='/user/fav' element={<h1>I'm the Favorites component</h1>} />
        <Route path='/user/wishlist' element={<h1>I'm the Wish List component</h1>} />
        <Route path='/user/cart' element={<h1>I'm the Cart component</h1>} />
        <Route path='/categories' element={<h1>I'm the Categories component</h1>} />
        <Route path='/newreleases' element={<h1>I'm the New Releases component</h1>} />
        <Route path='/popular' element={<h1>I'm the Popular component</h1>} />
        <Route path='/history' element={<h1>I'm the History component</h1>} />
      </Routes>
      <div className="six">
        <div><User/></div>
        <div></div>
      </div>
    </div>
  )
}

export default App
