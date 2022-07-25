import SearchBar from "./SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import UserButtons from './../UserButtons/index';
import '../../scss/SearchAndFilter/SearchAndLinks.scss';

type Props = {
  appear: boolean;
  setAppear: React.Dispatch<React.SetStateAction<boolean>>;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<string | number>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setColorF: any;
}

const SearchAndFilter = ({ setQuery, setGenre, setPage, setColorF }: Props) => {

  const { pathname, search } = useLocation();

  return (
    <div className="two">
        <section className="search-and-links">
          <SearchBar
            setQuery={setQuery}
            setPage={setPage}
          />

          <Link to='/' >
           <span>Discover</span>
          </Link>
          <Link to='/mangas'>
          <span onClick={() => {
            if(pathname === '/mangas' && search) {
              setGenre('All');
              setColorF([]);
              setPage(1);
            }
          }}>Mangas</span>
          </Link>
          <span >Hola</span>
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