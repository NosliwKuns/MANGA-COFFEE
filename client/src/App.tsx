import { Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.scss'
import Home from './components/Home';
import SearchAndFilter from './components/SearchAndFilter';
import { useState } from 'react'
import SideBar from './components/Home/SideBar';
import Detail from './components/Detail/Detail';
import Logeo from './components/Logeo/Logeo';


function App() {

  const [ appear, setAppear ] = useState<boolean>(false)
  console.log(appear);
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
      </Routes>
      <div className="six">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default App
