import OnePice from '../../../Images/one-peace.png';
import OnePiceBanner from '../../../Images/one-peace-banner.jpg'
import '../../../scss/Home/BannerMangas.scss';

const BannerMangas = () => {
  return (
    <section className="banner">
      <ul>
        <li>
          <img src={OnePiceBanner} alt={OnePiceBanner} />
          <div>
            <img className='manga' src={OnePice} alt={OnePice} />
            <h2>Noooooooooooooooooooooooooooooooooo</h2>
          </div>
        </li>
        <li><img src={OnePice} alt={OnePice} /></li>
        <li><img src={OnePice} alt={OnePice} /></li>
        <li><img src={OnePice} alt={OnePice} /></li>
      </ul>
        
      </section>
  )
};

export default BannerMangas;