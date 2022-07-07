
const SearchAndFilter = ({ appear , setAppear }: { appear: boolean; setAppear: React.Dispatch<React.SetStateAction<boolean>>}) => {

  const HandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAppear(!appear); 
  }

  return (
    <div className="two">
        <section className="search-and-filter">
          <h3>SearchBar</h3>
          <button onClick={HandleClick}>F</button>
          <div className={appear ? "appear" : "desappear"}>
            <h2>Action</h2>
            <h2>Fantasy</h2>
            <h2>Comedy</h2>
            <h2>Adult</h2>
            <h2>Adventure</h2>
            <h2>Horror</h2>
            <h2>Drama</h2>
            <h2>Vampire</h2>
            <h2>Tragedy</h2>
            <h2>Romance</h2>
            <h2>Ciberpunk</h2>
          </div>
        </section>
        <section className="display">
          {/* <LinkZone /> */}
          <h2>WishList</h2>
          <h2>Card</h2>
          <button className="bubble-chat">C</button>
          <button>A</button>
        </section>
    </div>
  )
};

export default SearchAndFilter;