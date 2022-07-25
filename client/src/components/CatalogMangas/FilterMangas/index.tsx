import { useEffect, useState } from 'react';
import { fetchMangaByGenres, fetchGetGenres } from "../../../features/manga/mangaSlice";
import { useAppDispatch , useAppSelector } from "../../../app/hooks";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../../../app/customHooks/useLocalStorage";
import '../../../scss/Home/FilterManga.scss';

type Props = {

  setGenre: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<string | number>>;
  colorF: any;
  setColorF : any;
  page: any;
  query: string;
}

const FilterMangas = ({ setGenre, setPage, colorF, setColorF, page, query } : Props) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { genres } = useAppSelector(state => state.mangas);
  const { pathname, search } = useLocation();
  console.log(page, "jojo")
  

  useEffect(() => {
    dispatch(fetchGetGenres())
    if (pathname === "/mangas" && search === "") {
      const send = colorF.join(',')
      /* setGenre(send) */

      const params : any = send || page || query ? { page: page, genre: send, q: query} : '';
      setGenre(send ? send : '')
      navigate({
        pathname: "/mangas",
        search: `?${createSearchParams(params)}`
      });
    }
  },[dispatch])


  const checkbox = (e : any) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const newArr = checked
      ? [...colorF, value]
      : [...colorF.filter((name : any) => name !== value)]

    setColorF(newArr)
    const send = newArr.join(',')
    setGenre(send ? send : 'All')
    setPage((prev) : any => {
      console.log((prev = 1), "aqui");
      const params : any = send ? { page: prev, genre: send } : { page: prev};
      navigate({
        pathname: "/mangas",
        search: `?${createSearchParams(params)}`
      });
      /* window.location.replace(`/?${createSearchParams(params)}`) */
    });
  };
  console.log(colorF, "save me")



  return (
    <>
    <div className='checkboxes'>
          <label htmlFor='item1' className='checkboxes_title'>
          {/* {colorF.length 
            ? colorF.map((t : any) => t).join(' , ')
            : 'Categories:'} */}
            Categories
          </label>
          <input type='checkbox' name='checkboxes' id='item1'/>

          <div className='checkbox_content'>
          {
            genres.map((t : any) => {
              let boolean = colorF.includes(t); 
              return (
                <label htmlFor={t.id} key={t.id} className={boolean ? 'checkbox' : 'select checkbox'}>
                   {t}
                  <input 
                    type='checkbox'
                    checked={boolean}
                    name='temperament'
                    id={t.id} 
                    value={t}
                    onChange={checkbox}/>
                </label>  
              )
            })
          }
        </div>
    </div>
    </>
  )
};

export default FilterMangas;