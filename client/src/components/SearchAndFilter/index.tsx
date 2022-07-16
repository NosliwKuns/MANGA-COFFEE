import SearchBar from "./SearchBar/SearchBar";
import FilterMangas from "./FilterMangas";
import { motion } from "framer-motion";

type Props = {
  appear: boolean;
  setAppear: React.Dispatch<React.SetStateAction<boolean>>;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<string | number>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchAndFilter = ({ appear , setAppear, setQuery, setGenre, setPage }: Props) => {

  const HandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAppear(!appear); 
  };

  const nose = (e : any) => {
    console.log(e)
    setAppear(!appear); 
  };

  const handleMouseLeave = () => {
    setAppear(!appear);
  };


  return (
    <div className="two">
        <section className="search-and-filter">
          <SearchBar
            setQuery={setQuery}
            setPage={setPage}
          />
          <button onMouseEnter={nose}  onClick={HandleClick}>F</button>
          <motion.div animate={{
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
          </motion.div>
          <button onClick={() => {
            /* setSearch('') */
            setGenre('')
          }}>Clear</button>
        </section>
        <section className="display">
          <h2>WishList</h2>
          <h2>Card</h2>
          <button className="bubble-chat">C</button>
          <button>A</button>
        </section>
    </div>
  )
};

export default SearchAndFilter;