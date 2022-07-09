import SearchBar from "./SearchBar/SearchBar";
import FilterMangas from "./FilterMangas";
const SearchAndFilter = ({ appear , setAppear }: { appear: boolean; setAppear: React.Dispatch<React.SetStateAction<boolean>>}) => {

  const HandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAppear(!appear); 
  }

  return (
    <div className="two">
        <section className="search-and-filter">
          <SearchBar/>
          <button onClick={HandleClick}>F</button>
          <div className={appear ? "appear" : "desappear"}>
            <FilterMangas />
          </div>
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