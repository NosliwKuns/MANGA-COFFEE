import '../../../scss/RightSide/PopularMangas.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { fetchAllManga } from '../../../features/manga/mangaSlice';
import { GoFlame } from 'react-icons/go';
import { Link } from 'react-router-dom'

const PopularMangas = () => {
  const dispatch = useAppDispatch();
  const mangas : any = useAppSelector(state => state.mangas.mangas.mangas);
  console.log(mangas);
  /* const popular = mangas.filter(p => p.) */

  console.log(mangas);
  useEffect(() => {
    dispatch(fetchAllManga(100))
  }, [])

  return (
    <div className="popular-mangas-container">
      
      {
        mangas.slice(0, 16).map((e : any) => {
          return (
            <Link to={`/mangas/detail/${e._id}`}>
              <div>
                <img src={e.cover_image} alt="" />
                <h3>{e.title}</h3>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
};

export default PopularMangas;