import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDetailManga, fetchCleanDetails } from "../../features/manga/mangaSlice";
import { useEffect} from "react";
import Rating from "./Rating";
import '../../scss/Details/Detail.scss';
import Comments from "./Comments";

const Detail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { manga } = useAppSelector((state) => state.mangas);
  
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
      <p>{manga.mangas.map((c : any) => c.chapter)}</p>
      <Comments comments={manga.comments}/>
    </div>
  );
};

export default Detail;

