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

const Detail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { manga } = useAppSelector((state) => state.mangas);
  const { token } = useAppSelector((state) => state.user);
  const userId = useAppSelector((state) => state.user.id);
  const headers = useHeaders(token)

  
  useEffect(() => {
    dispatch(fetchDetailManga ( id ));
    return dispatch(fetchCleanDetails());
  }, [dispatch, id]);


  

  return (
    <div className="five detail-container">
      <title>
        <h2>{manga.title}</h2>
      </title>
      <header>
        <div className="image-container">
          <img src={`${manga.cover_image}`} alt={`cover_page_${manga._id}`} />
        </div>
        <div className="info-container">
          <Rating rating={manga.rating}/>
            <span>
                <button onClick={() =>dispatch(FetchFavoriteMangas(userId, manga._id, headers))}><IoIosHeart /></button>
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
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
        <div>
          {
            manga.mangas.map((e : any)=> {
              return (
               
                  <div>{e.chapter}
                  {e.link.map((e : any)=> <img src={e}/>)}
                  </div>
                
              )
            })
          }
        </div>
      <Comments comments={manga.comments}/>
    </div>
  );
};

export default Detail;

