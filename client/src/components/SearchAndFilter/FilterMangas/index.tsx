import { useId } from "react";
import { useState } from 'react';
import { fetchMangaByGenres } from "../../../features/manga/mangaSlice";
import { useAppDispatch , useAppSelector } from "../../../app/hooks";

const FilterMangas = () => {

  const id = useId();
  const dispatch = useAppDispatch();
  const { mangas } = useAppSelector(state => state.mangas);
  const data : Array<string> = mangas.flatMap(e => e.genres); 
  const dataArr = new Set(data);
  const genres : Array<string> = [...dataArr];

  let b : Array<string> = ['action', 'adventure', 'fantasy', 'comedy', 'drama', 'mystery', 'romance', 'Drama', 'Action', 'horror', 'sciFi', 'school life']
  console.log(genres);

  const [change, setChange] = useState<any>([])

  const handleClick = (event: any) => {
    console.log(event.target.innerText);

    const newArr = !change.includes(event.target.innerText)
      ? [...change, event.target.innerText]
      : [...change.filter((genre : string) => genre !== event.target.innerText)]
  
    setChange(newArr)
    console.log(event.target.innerText)
  
    dispatch(fetchMangaByGenres(event.target.innerText))
  }


  return (
    <>
    {
      b.map( (genre: string) => {
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