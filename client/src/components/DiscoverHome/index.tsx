import BannerMangas from "./BannerMangas";
import PopularGenres from './PopularGenres/index';
import '../../scss/Home/Discover.scss';

type Props = {
  res: any;
}

const DiscoverHome = ({ res } : Props) => {
  return (
    <div className="five discover-section">
      <BannerMangas />
      <PopularGenres res={res}/>
    </div>
  )
};

export default DiscoverHome;