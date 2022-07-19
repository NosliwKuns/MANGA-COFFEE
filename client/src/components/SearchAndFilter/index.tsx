import SearchBar from "./SearchBar/SearchBar";
import FilterMangas from "./FilterMangas";
import { motion } from "framer-motion";
import '../../scss/SearchAndFilter/SearchAndLinks.scss';
import { Link } from "react-router-dom";
import UserButtons from './../UserButtons/index';

type Props = {
  appear: boolean;
  setAppear: React.Dispatch<React.SetStateAction<boolean>>;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<string | number>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchAndFilter = ({ appear , setAppear, setQuery, setGenre, setPage }: Props) => {

  return (
    <div className="two">
        <section className="search-and-links">
          <SearchBar
            setQuery={setQuery}
            setPage={setPage}
          />
          {/* <motion.div animate={{
            height: appear ? "200%" : 0,
            backgroundColor: '#212429',  
          }} 
          initial={{height: 0}}
          transition={ {duration : .5}}
          className={"appear"}
          onMouseLeave={handleMouseLeave}
          >
            <FilterMangas 
              setGenre={setGenre}
              setPage={setPage}
              appear={appear}
              setAppear={setAppear} 
            />
          </motion.div> */}
          <Link to='/' >
           <span>Discover</span>
          </Link>
          <Link to='/mangas' >
          <span>Mangas</span>
          </Link>
        </section>
        {/* <section className="display">
          <h2>WishList</h2>
          <h2>Card</h2>
          <button className="bubble-chat">C</button>
          <button>A</button>
        </section> */}
        <section className="display">
           {/* <UserButtons /> */}
        </section>
    </div>
  )
};

export default SearchAndFilter;