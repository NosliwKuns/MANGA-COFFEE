import SearchBar from "./SearchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
import UserButtons from './../UserButtons/index';
import '../../scss/SearchAndFilter/SearchAndLinks.scss';
import useIsActive from './../../app/customHooks/useIsActive';
import useMangaContext from "../../app/customHooks/useMangaContext";


type Props = {
  /* setGenre: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<string | number>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setColorF: any; */
  /* setQueryShop: any */
  /* res: any */
  /* resShop: any */
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchAndFilter = ({ /* setQuery, setGenre, setPage, setColorF, */ /* setQueryShop, */ /* res, */ /* resShop, */ isActive, setIsActive }: Props) => {

  const {setGenre, setColorF, setPage, setQuery, setSort } : any = useMangaContext();
  const { pathname, search } = useLocation();

  return (
    <div className="two">
        <section className="search-and-links">
          <SearchBar
            /* setQuery={setQuery}
            setPage={setPage} */
            /* setQueryShop={setQueryShop} */
            /* res={res} */
            /* resShop={resShop} */
          />
          <button onClick={() => setIsActive(!isActive)}>close</button>
          <Link to='/' >
            <span>Discover</span>
          </Link>
          <Link to='/mangas'>
          <span onClick={() => {
            if(pathname === '/mangas' && search) {
              setGenre('All');
              setColorF([]);
              setPage(1);
              setQuery('');
              setSort('')
            }
          }}>Mangas</span>
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