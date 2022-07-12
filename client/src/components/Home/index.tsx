import Cards from './Cards';
import BannerMangas from './BannerMangas';
import Sort from '../Home/Sort/Sort'
import '../../scss/Home/Home.scss';
import Pagination from './Pagination';

type Props = {
  docs: Array<any>;
  totalPages: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setAlph: React.Dispatch<React.SetStateAction<string>>;
  setRate: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ docs, totalPages, setPageNumber, setAlph, setRate }: Props) => {
  console.log(docs, "llegue?");
  return (
    <div className="five manga-content">
      <BannerMangas />
      <Sort 
        setAlph={setAlph}
        setRate={setRate}
      />
      <Cards docs={docs}/>
      <Pagination 
        totalPages={totalPages}
        setPageNumber={setPageNumber}
      />
    </div>
  )
};

export default Home;