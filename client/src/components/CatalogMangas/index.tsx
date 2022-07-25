import Cards from "./Cards";
import Pagination from "./Pagination";
import FilterMangas from "./FilterMangas"; 

type Props = {
  res: object;
  query: string;
  genre: string;
  setPage: React.Dispatch<React.SetStateAction<number | string>>;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  setSearchParams: (nextInit: any, navigateOptions?: { replace?: boolean | undefined; state?: any; } | undefined) => void;
  colorF: any;
  setColorF : any;
  page: any;
}

const CatalogMangas = ({ res, query, genre, setPage, setSearchParams, setGenre, colorF, setColorF, page } : Props) => {
  return (
    <div className="five">
      <FilterMangas 
        setPage={setPage}
        setGenre={setGenre}
        colorF={colorF}
        setColorF={setColorF}
        page={page}
      />
      <Cards
        res={res}
      />
      <Pagination 
        setPage={setPage}
        query={query}
        genre={genre}
        setSearchParams={setSearchParams}
        res={res}
      />
    </div>
  )
};

export default CatalogMangas;