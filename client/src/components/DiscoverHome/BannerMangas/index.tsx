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
import { useNavigate } from 'react-router-dom';

const BannerMangas = () => {

  const navigate = useNavigate()

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
            <div className="text">
              <div>
                <h2>One Piece</h2>
                <p>Seeking to be the greatest pirate in the world, young Monkey D. Luffy, endowed with stretching powers from the legendary "Gomu Gomu" Devil's fruit, travels towards the Grand Line in search of One Piece, the greatest treasure in the world.</p>
              </div>
              <div className="picture">
                <section className="shingeki">
                  <img src="https://res.cloudinary.com/den9jelya/image/upload/v1657553565/Action/action%20adventure%20comedy%20drama%20fantasy%20shoune/One_Piece_1/one_piece_otdmi2.jpg" alt="" />
                </section>
                <button onClick={() => {navigate("/mangas/detail/62c855e1b65f7bbce6cadc81", { replace: true })}}>Read</button>  
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={DragonBall} alt={DragonBall} />
            <div className="text">
              <div>
                <h2>Dragon Ball</h2>
                <p>Son Goku's adventure starts with Bulma crashing into to him while she is searching for the seven magical Dragon Balls, which can grant any wish. Together, they meet many people and many foes in their adventure chasing after the Dragon Balls.</p>
              </div>
              <div className="picture">
                <section className="shingeki">
                  <img src="https://res.cloudinary.com/den9jelya/image/upload/v1657216979/Action/action%20adventure%20comedy%20fantasy%20Historic%20martial%20arts%20shounen%20supernatural/Dragon_Ball_1/dragon_ball_1_1_brcjdy.jpg" alt="" />
                </section>
                <button onClick={() => {navigate("/mangas/detail/62c8580cb65f7bbce6cadc88", { replace: true })}}>Read</button>  
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={Shingeki} alt={Shingeki} />
            <div className="text">
              <div>
                <h2>Shingeki no Kyojin</h2>
                <p>Several hundred years ago, humans were nearly exterminated by giants. Giants are typically several stories tall, seem to have no intelligence, devour human beings and, worst of all, seem to do it for the pleasure rather than as a food source.</p>
              </div>
              <div className="picture">
                <section className="shingeki">
                  <img src="https://res.cloudinary.com/den9jelya/image/upload/v1657554105/Drama/Drama%20Action%20Fantasy%20Historical%20Horror%20Mystery%20Shounen%20Tragedy/Shingeki_No_Kyojin_1/shingeki_no_kyojin_c6dzqx.jpg" alt="" />
                </section>
                <button onClick={() => {navigate("/mangas/detail/62c8f5e7b65f7bbce6cadcce", { replace: true })}}>Read</button>  
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
  )
};

export default BannerMangas;