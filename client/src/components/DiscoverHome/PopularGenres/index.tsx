import "../../../scss/Home/PopularGenres.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import Img from "../../../Images/one-peace.png";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { config } from "../../../app/config";
import useMangaContext from './../../../app/customHooks/useMangaContext';

const PopularGenres = () => {
  const navigate = useNavigate();
  const popular = [
    {
      genre: "Action",
      mangas: [
        "https://res.cloudinary.com/den9jelya/image/upload/v1657594550/Horror/Horror%20Comedy%20Action%20SciFi%20Shounen/8kaijuu_1/8kaijuu_klme2v.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657339896/Horror/Horror%20Comedy%20drama%20Mystery%20Romance%20Psycoological%20Supernatural/Bakemonogatari_1/bakemonogatari_1_2_jt88dc.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657338106/Horror/Horror%20Action/Berserk_1/berserk_1_2_xr4ewr.jpg",
      ],
    },
    {
      genre: "Adventure",
      mangas: [
        "https://res.cloudinary.com/den9jelya/image/upload/v1657223391/Drama/Drama%20Action%20Adventure%20Fantasy%20Romance%20Shounen/Berserk_Of_Gluttony_1/berserk_of_gluttony_1_1_clvb1w.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657216979/Action/action%20adventure%20comedy%20fantasy%20Historic%20martial%20arts%20shounen%20supernatural/Dragon_Ball_1/dragon_ball_1_1_brcjdy.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657341252/SciFi/SciFi%20Action%20Comedy%20Fantasy%20Supernatural%20Shounen/Hero_I_Quit_A_Long_Time_Ago_1/hero_i_quit_a_long_time_ago_1_3_o8aq2t.jpg",
      ],
    },
    {
      genre: "Fantasy",
      mangas: [
        "https://res.cloudinary.com/den9jelya/image/upload/v1657340516/Romance/Romance%20Ecchi%20Comedy%20School%20Life/Arigatights_1/arigatights_1_2_z6idbm.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657217647/Action/Action%20fantasy%20Shounen/Black_Clover_1/black_clover_1_2_sjpzyk.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657222457/Comedy/Comedy/Comedy%20Fantasy%20Romance%20Shounen%20Supernatural/Demon_Lord_At_Work_1/demon_lord_at_work_1_1_hd69vw.jpg",
      ],
    },
    {
      genre: "Comedy",
      mangas: [
        "https://res.cloudinary.com/den9jelya/image/upload/v1657578944/Super%20Power/Super%20power%20Action%20Drama%20Fantasy%20Martial%20Arts%20Supernatural/Naruto_Gaiden_The_Seventh_Hokage_1/naruto_gaiden_the_seventh_hokage_ttx5oe.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657553565/Action/action%20adventure%20comedy%20drama%20fantasy%20shoune/One_Piece_1/one_piece_otdmi2.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657593804/Super%20Power/Super%20power%20Action%20Adventure%20Comedy%20Fantasy/Dgray_Man_1/dgray_man_cgpahb.jpg",
      ],
    },
    {
      genre: "Drama",
      mangas: [
        "https://res.cloudinary.com/den9jelya/image/upload/v1657223727/Drama/Drama%20Adventure%20Fantasy%20Seinen%20Slice%20of%20life/Somali_To_Mori_No_Kami_Sama_1/somali_to_mori_no_kami_sama_1_1_kfecvj.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657335125/Drama/Drama%20Action%20Comedy%20School%20life%20Ecchi%20Shounen%20Supernatural/Fire_Brigade_Of_Flames_1/fire_brigade_of_flames_wdfbqi.jpg",
        "https://res.cloudinary.com/manga-coffe/image/upload/v1658588662/Mangas/Shijou%20Saikyou%20no%20Deshi%20Kenichi/cover_image/kjxc4ndwodcimz70p3wu.jpg",
      ],
    },
    {
      genre: "Romance",
      mangas: [
        "https://res.cloudinary.com/den9jelya/image/upload/v1657340400/Romance/Romance%20Drama%20School%20Life%20Shounen/Koi_To_Uso_1/koi_to_uso_1_1_eqmis7.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657554976/School%20Life/School%20Life%20Romance%20Shounen%20Comedy/Komi_San_Wa_Komyushou_Desu_0/komi_san_wa_komyushou_desu_nzsg4b.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657340747/Romance/Romance%20Ecchi%20Harem%20Comedy%20School%20Life%20Slice%20of%20Life%20Shounen/Kanojo_Okarishimasu_1/kanojo_okarishimasu_1_1_plmlxi.jpg",
      ],
    },
    {
      genre: "SciFi",
      mangas: [
        "https://res.cloudinary.com/den9jelya/image/upload/v1657554560/SciFi/SciFi%20School%20Life%20Comedy%20Ecchi%20Romance/Tsukiiro_No_Invader_1/tsukiiro_no_invader_liwqvz.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657405351/SciFi/SciFi%20Romance%20Action%20Adventure%20Drama%20Seinen/Rebuild_World_1/rebuild_world_oq6jat.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657341455/SciFi/SciFi%20Action%20Shounen%20Supernatural/World_Trigger_1/world_trigger_1_1_khqyfd.jpg",
      ],
    },
    {
      genre: "School Life",
      mangas: [
        "https://res.cloudinary.com/den9jelya/image/upload/v1657555774/School%20Life/School%20Life%20Ecchi%20Shounen%20Slice%20Of%20Life/Shokugeki_No_Soma_1/shokugeki_no_soma_dbxxqr.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657340596/Romance/Romance%20Ecchi%20Harem%20Comedy%20School%20Life%20Shounen/Hajimete_No_Gal_1/hajimete_no_gal_1_1_ew51zi.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657409919/School%20Life/School%20Life%20Comedy%20Drama%20Schounen%20Sports/Diamond_No_Ace_Act_Ii_1/diamond_no_ace_iyinyr.jpg",
      ],
    },
    {
      genre: "Super Power",
      mangas: [
        "https://res.cloudinary.com/den9jelya/image/upload/v1657593207/Super%20Power/Super%20Power%20Action%20Adventure%20Fantasy%20Romance%20SciFi%20SuperNatural/Psyren_1/psyren_i4nhcl.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657579781/Super%20Power/Super%20power%20Action%20Drama%20Fantasy%20Martial%20Arts%20Supernatural/Naruto_1/naruto_1_1_rb5ikr.jpg",
        "https://res.cloudinary.com/den9jelya/image/upload/v1657578714/Super%20Power/Super%20Power%20Magic%20School%20Life%20Supernatural/Yozakura_Quartet_1/yozakura_quartet_1_1_qtulgy.jpg",
      ],
    },
  ];

  const { setGenre } : any = useMangaContext()

  useEffect(() => {
    const elementos: NodeList = document.querySelectorAll(
      "#popular-genres .swiper-slide"
    );

    elementos.forEach((elemento: Node, index: number, parent: NodeList) => {
      if (elemento instanceof HTMLElement) {
        elemento.onclick = function () {
          console.log("Hiciste clic en el elemento:", elemento.textContent);
		  setGenre(elemento.textContent?.toLocaleLowerCase())
		  navigate(`/mangas?page=1&genre=${elemento.textContent?.toLocaleLowerCase()}&q=&sort=`)
        };
      }
    });
    console.log(elementos);
  }, []);

  return (
    <div id="popular-genres">
      <h2 className="a">Popular Genres</h2>
      <section className="hidden">
        <div className="shadow l"></div>
        <div className="shadow r"></div>
        <Swiper
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            500: {
              slidesPerView: 1,
              spaceBetween: 0,
              slidesPerGroup: 0,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1600: {
              slidesPerView: 3,
              spaceBetween: 30,
              slidesPerGroup: 3,
            },

            1900: {
              slidesPerView: 4,
              spaceBetween: 30,
              slidesPerGroup: 4,
            },
          }}
          className="mySwiper"
        >
          {popular.map((e: any) => {
            return (
              <div onClick={() => alert("helloworld")}>
                <SwiperSlide>
                  <img className="left" src={e.mangas[0]} alt="" />
                  <img className="center" src={e.mangas[1]} alt="" />
                  <img className="right" src={e.mangas[2]} alt="" />
                  <h3>{e.genre}</h3>
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
      </section>

      {/* <main>
		<div className="text">
			<h1>Simple Single carousel</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam non atque adipisci est, recusandae aperiam, ullam minima quos nostrum animi voluptas sequi. At repellendus fuga reiciendis accusantium, dolor suscipit repellat?
			</p>
		</div>
		<header>
			<h1>Top Hottest Products</h1>
			<p>
				<span onClick={left_mover}>A</span>
				<span onClick={right_mover}>B</span>
			</p>
		</header>
    <div className="slider">
		<section>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product One</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product Two</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product Three</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product Four</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product Five</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product Six</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product Seven</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product Eight</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product Nine</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product Ten</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product Eleven</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
			<div className="product">
				<picture>
					<img src={Img} alt=""/>
				</picture>
				<div className="detail">
					<p>
						<b>Product Twelve</b>
						<small>New arrival</small>
					</p>
					<samp>$45.00</samp>
				</div>
				<div className="button">
					<p className="star">
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
						<strong>&star;</strong>
					</p>
					<a href="#">Add-cart</a>
				</div>
			</div>
		</section>
    </div>
	</main>
 */}
    </div>
  );
};

export default PopularGenres;
