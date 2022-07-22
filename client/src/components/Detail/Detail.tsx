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


const Detail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { manga } = useAppSelector((state) => state.mangas);
  const { token, user, verificated } = useAppSelector((state) => state.user);
  const userId = useAppSelector((state) => state.user.id);
  const headers = useHeaders(token)

  //console.log(manga)

  const handleClick = () => {
    if(user && !verificated) {
        alert('Please verify your account!')
    } else if(user && verificated) {
      dispatch(FetchFavoriteMangas(userId, manga._id, headers))
    } else if(!user && !verificated){
        alert('To add Manga to favorites, you must Sign In!')
    }
}

  
  useEffect(() => {
    dispatch(fetchDetailManga ( id ));
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
            <span>
                <button onClick={() => handleClick()}><IoIosHeart /></button>
            </span>
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
        <div>
          {
            manga.mangas.map((e : any)=> {
              return (
                <Link to={`/mangas/${manga.title}/chapter_${e.chapter}/${id}`}>
                  <div>{e.chapter}
                  {/* {e.link.map((e : any)=> <img src={e}/>)} */}
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

