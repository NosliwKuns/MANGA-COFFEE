import Cards from './Cards';
import BannerMangas from './BannerMangas';
import '../../scss/Home/Home.scss';

const Home = () => {
  return (
    <div className="five manga-content">
      <BannerMangas />
      <Cards />
    </div>
  )
};

export default Home;