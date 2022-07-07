import { Routes, Route } from 'react-router-dom';
import './App.scss'
import Home from './components/Home';
import Detail from './components/Detail/Detail';
import SearchAndFilter from './components/SearchAndFilter';
import { useState } from 'react'

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
        <div className="side-bar"></div>
        <div className="greeting"></div>
      </div>
        
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<h1>I'm the Store component</h1>} />
        <Route path="/detail/:id" element={<Detail/>} />
      </Routes>
      <div className="six">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default App
