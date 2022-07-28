import { useState } from 'react'
import { createSearchParams, useNavigate } from "react-router-dom";

type Props = {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setPage: any
  setGenre: any
  genre: any
}

const Sorts = ({ sort, setSort, setPage, setGenre, genre }: Props) => {
  
  const [display, setDisplay] = useState('All')
  const navigate = useNavigate();

  const sortBy = (value: string, text: string) => {
    setSort(value)
    setDisplay(text)
    setPage((prev : any) : any => {
      console.log((prev = 1), "aqui");
      genre === '' ? setGenre("All") : genre
      const params : any = { page: prev, genre: genre === '' ? "All" : genre, sort: value };
      navigate({
          pathname: "/mangas",
          search: `?${createSearchParams(params)}`
      });
      /* window.location.replace(`/mangas?${createSearchParams(params)}`) */
  });
  }

  return (
    <div className='checkboxes'>
          <label htmlFor='item2' className='checkboxes_title'>
          {/* {colorF.length 
            ? colorF.map((t : any) => t).join(' , ')
            : 'Categories:'} */}
            Sort By: {display}
          </label>
          <input type='checkbox' name='checkboxes' id='item2'/>

          <div className='checkbox_content'>
            <div 
              className="select checkbox"
              onClick={() => sortBy('title', 'Alphabetical A-Z')}> 
              Alphabetical A-Z 
            </div>
            <div 
              className="select checkbox"
              onClick={() => sortBy('title,desc', 'Alphabetical Z-A')}>
              Alphabetical Z-A
            </div>
            <div 
              className="select checkbox"
              onClick={() => sortBy('rating,desc', 'Rating High to Low')}>
              Rating High to Low
            </div>
            <div 
              className="select checkbox"
              onClick={() => sortBy('rating', 'Rating Low to High')}>
              Rating Low to High 
            </div> 
        </div>
    </div>
    
  )
};

export default Sorts;