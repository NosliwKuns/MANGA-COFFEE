import { useId } from "react";
import { useEffect } from 'react';
import { fetchMangaByGenres, fetchGetGenres } from "../../../features/manga/mangaSlice";
import { useAppDispatch , useAppSelector } from "../../../app/hooks";
import { createSearchParams, useNavigate } from "react-router-dom";
type Props = {
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<string | number>>;
  appear: boolean;
  setAppear: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterMangas = ({ setGenre, setPage, appear, setAppear } : Props) => {
  const id = useId();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { genres } = useAppSelector(state => state.mangas);

  useEffect(() => {
    dispatch(fetchGetGenres())
  },[dispatch])

  

  const handleClick = (genre : any ) => {
    setGenre(genre);
    setPage((prev) : any => {
      console.log((prev = 1), "aqui");
      const params : any = { page: prev, genre: genre };
      /* navigate({
        pathname: "/",
        search: `?${createSearchParams(params)}`
      }); */
      window.location.replace(`/?${createSearchParams(params)}`)
    });
  };



  return (
    <>
    <div onClick={() => handleClick("All")}>All</div>
    { 
      genres.map( (genre: string) => {
        return (
          <div
            key={`${id}_${genre}`}
            onClick={() => handleClick(genre)}
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