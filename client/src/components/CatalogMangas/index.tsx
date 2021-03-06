import Cards from "./Cards";
import Pagination from "./Pagination";

type Props = {
  res: object;
  query: string;
  genre: string;
  setPage: React.Dispatch<React.SetStateAction<number | string>>;
  setSearchParams: (nextInit: any, navigateOptions?: { replace?: boolean | undefined; state?: any; } | undefined) => void;
}

const CatalogMangas = ({ res, query, genre, setPage, setSearchParams } : Props) => {
  return (
    <div className="five">
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