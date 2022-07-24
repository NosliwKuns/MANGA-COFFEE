import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDetailManga, fetchCleanDetails } from "../../features/manga/mangaSlice";
import {FetchFavoriteMangas} from '../../features/user/userSlice';
import { useEffect} from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import '../../scss/Details/Detail.scss';
import Comments from "./Comments";
import { IoIosHeart } from "react-icons/io";
import useHeaders from "../../app/headers";
import { carAnimation, h3Animation } from "../../Animation";
import { motion } from "framer-motion"; 
import { getFavManga, fetchDeleteFavorites } from './../../features/user/userSlice';


const Detail = () => {
  const dispatch = useAppDispatch();
  const params : any = useParams();
  const { manga } = useAppSelector((state) => state.mangas);
  const { id, token, user, verificated, favorites } = useAppSelector((state) => state.user);
  const userId = useAppSelector((state) => state.user.id);
  const headers = useHeaders(token)
  console.log(favorites, "jue[")
  let fav = favorites?.find(e => e._id === params.id) ? true : false
  console.log(fav, 'fav')

  const handleClick = () => {
    if(user && !verificated) {
        alert('Please verify your account!')
    } else if(user && verificated && !fav) {
      dispatch(FetchFavoriteMangas(userId, manga._id, headers))
    } else if (user && verificated && fav) {
      dispatch(fetchDeleteFavorites(userId, params.id, headers))
    } else if(!user && !verificated){
        alert('To add Manga to favorites, you must Sign In!')
    } /* else if(favorites.find(e => e._id === params.id)) */
}

  
  useEffect(() => {
    dispatch(fetchDetailManga ( params.id ));
    dispatch(getFavManga(id, headers))
    return dispatch(fetchCleanDetails());
  }, [dispatch, id]);


  

  return (
    <motion.div 
      variants={carAnimation} 
      animate='show' 
      exit='hide' 
      className="five detail-container">
      <title>
        <h2>{manga.title}</h2>
      </title>
      <header>
        <motion.div 
          variants={h3Animation} 
          animate='show' 
          exit='hide' 
          className="image-container">
          <img src={`${manga.cover_image}`} alt={`cover_page_${manga._id}`} />
        </motion.div>
        <div className="info-container">
          <Rating rating={manga.rating}/>
          <div 
            className="favorites"
            onClick={() => handleClick()}>
              <IoIosHeart 
                size="34"
                color={fav ? "#EA374B" : "#9394A9" }
                /> 
          </div> 
          <h2>Genres:</h2>
          <ul>
            {manga.genres.map((genre: string, i: number) => (
              <li key={`${manga.title}_detail ${i}`}>{genre}</li>
            ))}
          </ul>
        </div>
      </header>
      <h2 className="sub-title">Description :</h2>
      <p>{manga.description}</p>
      <h2 className="sub-title">Lista de capitulos</h2>
      <div className="chapter-container">
        {
          manga.mangas.map((e : any)=> {
            return (
              <Link to={`/mangas/${manga.title}/chapter_${e.chapter}/${params.id}`}>
                <div className="chapter-image">{/* {e.chapter} */}
                  <img src={e.link[1]} alt={`chapter_${e.chapter}`}></img>
                  <div>
                    <h2><span>#</span>00{e.chapter}</h2> 
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
      
      <Comments/>
    </motion.div>
  );
};

export default Detail;

