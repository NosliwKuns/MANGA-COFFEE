import Cards from "./Cards";
import Pagination from "./Pagination";
import FilterMangas from "./FilterMangas"; 
import Sorts from './Sorts/index';

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
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

const CatalogMangas = ({ res, query, genre, setPage, setSearchParams, setGenre, colorF, setColorF, page, sort, setSort } : Props) => {
  return ( 
    <div className="five">
      <Sorts 
        sort={sort}
        setSort={setSort}
      />
      <FilterMangas 
        setPage={setPage}
        setGenre={setGenre}
        colorF={colorF}
        setColorF={setColorF}
        page={page}
        query={query}
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