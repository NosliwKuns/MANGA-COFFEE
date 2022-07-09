import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDetailManga } from "../../features/manga/mangaSlice";
import { useEffect } from "react";
const Detail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchDetailManga ( id ));
  }, [dispatch, id]);

  const { manga } = useAppSelector((state) => state.mangas);

  return (
    <div className="five">
      <header>{manga.title}</header>
      <ul>
        {manga.genres.map((genre: string, i: number) => (
          <li key={`${manga.title}_detail ${i}`}>{genre}</li>
        ))}
      </ul>
      <img src={`${manga.cover_image}`} alt={`cover_page_${manga._id}`} />
      <p>{manga.description}</p>
      {/* <h3>{manga.chapter}nop</h3> */}
      {/* <ul>
        {manga.chapters.map((charapter: string, i: number) => (
          <li key={`${manga.title}_charapter ${i}`}>{charapter}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Detail;

// {
//   _id : '',
//   title : '',
//   genre : [''],
//   description : '',
//   cover_image : '',
//   chapters : [''] ,
// }
