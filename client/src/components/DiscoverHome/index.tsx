import BannerMangas from "./BannerMangas";
import PopularGenres from './PopularGenres/index';
import '../../scss/Home/Discover.scss';
import a from '../../Images/dbz.jpg';

const DiscoverHome = () => {
  return (
    <div className="five discover-section">
      <BannerMangas />
      <PopularGenres />
      <div className="container">
        <div className="product-grid">
        <div className="card stacked featured">
          <img src={a} alt="a grey baseball hat with a small palm tree on the front" className="card__img"/>
          <div className="card__content">
            <h2 className="card__title">Lorem, ipsum dolor.</h2>
            <p className="card__price">$325</p>
            <p className="card__description">Lorem, ipsum dolor.</p>
          </div>
        </div>
        {
          [a, a, a].map(e => {
            return (
                <div className="card stacked">
                  <img src={e} alt="a grey baseball hat with a small palm tree on the front" className="card__img"/>
                  <div className="card__content">
                    <h2 className="card__title">Lorem, ipsum dolor.</h2>
                    <p className="card__price">$325</p>
                    <p className="card__description">Lorem, ipsum dolor.</p>
                  </div>
                </div>
            )
          })
        }
          </div>

    </div>
    </div>
  )
};

export default DiscoverHome;