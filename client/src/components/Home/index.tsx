import Cards from './Cards';
import BannerMangas from './BannerMangas';
import Sort from '../Home/Sort/Sort'
import '../../scss/Home/Home.scss';
import Pagination from './Pagination';

type Props = {
  res: object;
  query: string;
  genre: string;
  setPage: React.Dispatch<React.SetStateAction<number | string>>;
  setSearchParams: (nextInit: any, navigateOptions?: { replace?: boolean | undefined; state?: any; } | undefined) => void;
}

const Home = ({ res, query, genre, setPage, setSearchParams }: Props) => {
  console.log(res, "llegue?");
  return (
    <div className="five manga-content">
      {/* <BannerMangas />
      <Sort /> */}
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

export default Home;