import Cards from './Cards';
import BannerMangas from './BannerMangas';
import Sort from '../Home/Sort/Sort'
import '../../scss/Home/Home.scss';
import Pagination from './Pagination';

type Props = {
  mangas: Array<any>;
  totalPages: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setAlph: React.Dispatch<React.SetStateAction<string>>;
  setRate: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ mangas, totalPages, setPageNumber, setAlph, setRate }: Props) => {
  console.log(mangas, "llegue?");
  return (
    <div className="five manga-content">
      <BannerMangas />
      <Sort 
        setAlph={setAlph}
        setRate={setRate}
      />
      <Cards /* mangas={mangas} *//>
      <Pagination 
        /* totalPages={totalPages} */
        setPageNumber={setPageNumber}
      />
    </div>
  )
};

export default Home;