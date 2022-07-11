import SearchBar from "./SearchBar/SearchBar";
import FilterMangas from "./FilterMangas";

type Props = {
  appear: boolean;
  setAppear: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setAlph: React.Dispatch<React.SetStateAction<string>>;
  setRate: React.Dispatch<React.SetStateAction<string>>;
}

const SearchAndFilter = ({ appear , setAppear, setSearch, setGender, setAlph, setRate }: Props) => {

  const HandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAppear(!appear); 
  }

  return (
    <div className="two">
        <section className="search-and-filter">
          <SearchBar
            setSearch={setSearch}
          />
          <button onClick={HandleClick}>F</button>
          <div className={appear ? "appear" : "desappear"}>
            <FilterMangas 
              setGender={setGender}
              setSearch={setSearch}
            />
          </div>
          <button onClick={() => {
            setSearch('')
            setGender('')
            setAlph('')
            setRate('')
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