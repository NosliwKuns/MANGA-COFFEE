import Cards from './Cards';
import BannerMangas from './BannerMangas';
import Sort from '../Home/Sort/Sort'
import '../../scss/Home/Home.scss';
import Pagination from './Pagination';

const Home = () => {
  return (
    <div className="five manga-content">
      <BannerMangas />
      <Sort />
      <Cards />
      <Pagination />
    </div>
  )
};

export default Home;