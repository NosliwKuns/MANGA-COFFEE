import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {}

// const Leer = () => {
//   const id = useParams()
//   const { manga } = useAppSelector((state) => state.mangas);

//   useEffect(() => {
//     dispatch(fetchDetailManga ( id ));
//     return dispatch(fetchCleanDetails());
//   }, [dispatch, id]);

//   const a = Number(id)
//   const b = manga.mangas.map(e => e.link)
//   console.log(manga, 'yeah')
//   const c = b[a - 1]
//   return (
//     <div>
//       {/* { c.map(e => <img src={e}/>) } */}
//       hola
//     </div>
//   )
// };

// export default Leer;