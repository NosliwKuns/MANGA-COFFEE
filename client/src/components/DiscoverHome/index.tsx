import BannerMangas from "./BannerMangas";
import PopularGenres from './PopularGenres/index';

const DiscoverHome = () => {
  return (
    <div className="five">
      <BannerMangas />
      <PopularGenres />
    </div>
  )
};

export default DiscoverHome;