import OnePiceBanner from '../../../Images/one-peace-banner.jpg'
import DragonBall from '../../../Images/dbz.jpg';
import Shingeki from '../../../Images/shingeki.jpg';
import '../../../scss/Home/BannerMangas.scss';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const BannerMangas = () => {
  return (
    <section className="banner-manga">
{/*       <ul>
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
         */}

<Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={OnePiceBanner} alt={OnePiceBanner} />
        </SwiperSlide>
        <SwiperSlide><img src={DragonBall} alt={DragonBall} /></SwiperSlide>
        <SwiperSlide><img src={Shingeki} alt={Shingeki} /></SwiperSlide>
      </Swiper>
  
      </section>
  )
};

export default BannerMangas;