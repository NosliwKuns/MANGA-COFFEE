import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDetailManga } from "../../features/manga/mangaSlice";
import { useEffect} from "react";
import Rating from "./Rating";
import '../../scss/Details/Detail.scss';

const Detail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { manga } = useAppSelector((state) => state.mangas);
  
  useEffect(() => {
    dispatch(fetchDetailManga ( id ));
  }, [dispatch, id]);
  

  return (
    <div className="five detail-container">
      <header>
        <h2>{manga.title}</h2>
      </header>
      <section>
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
      </section>
      <h2 className="sub-title">Description :</h2>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.description}</p>
      <p>{manga.mangas.map((c : any) => c.chapter)}</p>
    </div>
  );
};

export default Detail;

