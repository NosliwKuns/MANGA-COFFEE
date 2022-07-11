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

function App() {

  const [ appear, setAppear ] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    const localUser:any  = localStorage.getItem('copySliceUser')
    const user = JSON.parse(localUser)
    if(user){
     dispatch(loginUser(user))
    }
  },[])
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
        <h2>WishList</h2>
        <h2>Card</h2>
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
      </Routes>
      <div className="six">
        <div><User/></div>
        <div></div>
      </div>
    </div>
  )
}

export default App
