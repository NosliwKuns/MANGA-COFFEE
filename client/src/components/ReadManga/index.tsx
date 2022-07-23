import { useAppDispatch, useAppSelector} from "../../app/hooks";
import { useEffect } from 'react';
import { fetchDetailManga } from './../../features/manga/mangaSlice';
import { fetchCleanDetails } from "../../features/manga/mangaSlice";
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import '../../scss/Details/ReadManga.scss';
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination, Navigation } from "swiper";


const ReadManga = () => {
  const { chapter, id } : any = useParams();
  console.log(id);
  const dispatch = useAppDispatch();
  const { manga } = useAppSelector(state => state.mangas);
  const images = manga.mangas
  console.log(manga, "hey")
  const chap = chapter[chapter.length - 1]
  const readable = manga.mangas.find(e => e.chapter == chap)
  console.log(readable, id , 'porfi');

  useEffect(() => {
    dispatch(fetchDetailManga (id));
    return dispatch(fetchCleanDetails());
  }, [dispatch]);

/*   const pagination = {
    clickable: true,
    renderBullet: function (index : any, className : any) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  }; */

  return (
    <div className="five manga-viewer">
      <div className="outer-content">
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
          {
            readable?.link.map(e => {
              return (
                <SwiperSlide>
                  <img src={e} alt="sas"/>
                </SwiperSlide>
              )
            })
          }
      </Swiper>
      </div>
    </div>
  )
}; 

export default ReadManga;