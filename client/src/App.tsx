import { Routes, Route } from 'react-router-dom';
import './App.scss'
import Cards from './components/Cards/Cards';
import Detail from './components/Detail/Detail';
import Logeo from './components/Logeo/Logeo';

function App() {

  return (
    <div className="App">
      <div className="one">
        <h2>MANGA COFFEE</h2>
        <h3>MC</h3>
      </div>
      <div className="two">
        <section className="search-and-filter">
          <h3>SearchBar</h3>
          <button>F</button>
        </section>
        <section className="display">
          {/* <LinkZone /> */}
          <h2>WishList</h2>
          <h2>Card</h2>
          <button className="bubble-chat">C</button>
          <button>A</button>
        </section>
      </div>
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
        <Route path="/" element={<Cards/>} />
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
