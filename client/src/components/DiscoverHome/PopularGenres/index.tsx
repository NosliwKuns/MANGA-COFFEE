import '../../../scss/Home/PopularGenres.scss'; 

import { Swiper, SwiperSlide } from "swiper/react";
import Img from '../../../Images/one-peace.png'

// Import Swiper styles
// import "swiper/css/pagination";
// import "swiper/css/navigation";


// import required modules
import { Pagination, Navigation } from "swiper";

const PopularGenres = () => {
  const aspect = () => {
  /*  let element = document.getElementsByclassNameName("a") as unknown */ 
   let e = document.querySelectorAll<HTMLElement>("a")
 /*  .forEach(node => node.click()); */
  console.log(e);
  
   
  }
  

  /* let span = document.getElementsByTagName('span'); */
	let product : any = document.getElementsByClassName('product')
	let product_page = Math.ceil(product.length/4);
	let l = 0;
	let movePer = 35.34;
	let maxMove = 152;
	// mobile_view	
	let mob_view = window.matchMedia("(max-width: 768px)");
	if (mob_view.matches)
	 {
	 	movePer = 50.36;
	 	maxMove = 504;
	 }

   console.log(movePer);

	let right_mover = ()=>{
		l = l + movePer;
		if (product === 1){l = 0; }
		for(const i of product)
		{
			if (l > maxMove){l = l - movePer;}
			i.style.left = '-' + l + '%';
		}

	}
	let left_mover = ()=>{
		l = l - movePer;
		if (l<=0){l = 0;}
		for(const i of product){
			if (product_page>1){
				i.style.left = '-' + l + '%';
			}
		}
    console.log(l)
	}
	/* span[1].onclick = ()=>{right_mover();}
	span[0].onclick = ()=>{left_mover();}
 */
  return (
    <div className="popular-genres">
      <h2 className="a" onClick={() => {alert("Popular Genres!")}}>Popular Genres</h2>
      <button onClick={aspect}>P</button>
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
        breakpoints= {{
          500: {
            slidesPerView: 1,
            spaceBetween: 0,
            slidesPerGroup: 0
            
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
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1600: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3
          },

          1900: {
            slidesPerView: 4,
            spaceBetween: 30,
            slidesPerGroup: 4
          },
        }}
        className="mySwiper"
      >
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => {
            return (
              <div>
              <SwiperSlide>
               
                <img className='left' src={Img} alt="" />
                <img className='center' src={Img} alt="" />
                <img className='right' src={Img} alt="" />
                <h3>GENERO X</h3> 
              </SwiperSlide>
                </div>
              
            )
          })
        }
      </Swiper>
      </section>

      <main>
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





    </div>
  )
};

export default PopularGenres