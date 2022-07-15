import { useId } from "react";
import { useEffect } from 'react';
import { fetchMangaByGenres, fetchGetGenres } from "../../../features/manga/mangaSlice";
import { useAppDispatch , useAppSelector } from "../../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
type Props = {
  setGenres: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const FilterMangas = ({ setGenres, setSearch } : Props) => {
  const id = useId();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const url = useLocation();
  console.log(url);
  const { genres } = useAppSelector(state => state.mangas);

  useEffect(() => {
    dispatch(fetchGetGenres())
  },[])

  

  const handleClick = (event: any) => {
    /* dispatch(fetchMangaByGenres(event.target.innerText)) */
    /* setSearch('') */
    setGenres(event.target.innerText);
    navigate("/", { replace: true });
  }


  return (
    <>
    {
      genres.map( (genre: string) => {
        return (
          <div
            key={`${id}_${genre}`}
            onClick={handleClick}
          >
            {genre}
          </div>
        )
      })
    }
    </>
  )
};

export default FilterMangas;