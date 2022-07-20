import BannerMangas from "./BannerMangas";
import PopularGenres from './PopularGenres/index';
import '../../scss/Home/Discover.scss';
import a from '../../Images/dbz.jpg';

const DiscoverHome = () => {
  return (
    <div className="five discover-section">
      <BannerMangas />
      <PopularGenres />
    </div>
  )
};

export default DiscoverHome;