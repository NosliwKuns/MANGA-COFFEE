import { useAppDispatch, useAppSelector} from "../../app/hooks";
import { useEffect } from 'react';
import { fetchDetailManga } from './../../features/manga/mangaSlice';
import { fetchCleanDetails } from "../../features/manga/mangaSlice";
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from 'sweetalert2'
import '../../scss/Details/ReadManga.scss';
// import '../../scss/Details/Comments.scss';
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination, Navigation } from "swiper";
import withReactContent from 'sweetalert2-react-content';


const ReadManga = () => {
  const navigate = useNavigate();
  const { chapter, id } : any = useParams();
  console.log(id);
  const dispatch = useAppDispatch();
  const { manga } = useAppSelector(state => state.mangas);
  const images = manga.mangas
  console.log(manga.mangas, "hey")
  const chap = chapter[chapter.length - 1]
  const readable = manga.mangas.find(e => e.chapter == chap)
  console.log(readable, id , 'porfi');

  useEffect(() => {
    dispatch(fetchDetailManga (id));
    return dispatch(fetchCleanDetails());
  }, [dispatch]);

  const nextChapter = () => {
    if(Number(chap) < manga.mangas.length) {
      navigate(`/mangas/${manga.title}/chapter_${Number(chap) < manga.mangas.length ? Number(chap) + 1 : Number(chap)}/${id}`, { replace: true })
    } else {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        icon: 'error',
        showCloseButton: true,
        html: <h1>No more chapters available</h1>,
        background: "#212429",
        confirmButtonText: <div onClick={() => navigate("/", { replace: true })} className="divSignIn">Back Home</div>,
        buttonsStyling: false,
        customClass: {
          confirmButton: 'confirmButtonDelete',
        }
      })
    }
  }

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
        <div className="btn-group">
          <button onClick={() => navigate(`/mangas/detail/${id}`, { replace: true })}>back</button>
          <button onClick={() => navigate(`/mangas/${manga.title}/chapter_${Number(chap) > 1 ? Number(chap) - 1 : Number(chap)}/${id}`, { replace: true })}>prev chap</button>
          <button onClick={nextChapter}>next chap</button>
        </div>
        <div className="chapter">Chapter {chap}</div>
      </div>
    </div>
  )
}; 

export default ReadManga;