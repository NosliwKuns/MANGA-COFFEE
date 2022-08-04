import { useState } from 'react'
import { createSearchParams, useNavigate } from "react-router-dom";
import useProductContext from '../../../app/customHooks/useProductContex';


type Props = {
  /* shopSort: string;
  setshopSort: React.Dispatch<React.SetStateAction<string>>;
  setPageShop: any
  setGenreShop: any
  genreShop: any */
}

const ShopSort = ({ /* shopSort, setshopSort, setPageShop, setGenreShop, genreShop  */}: Props) => {
  
  const [display, setDisplay] = useState('All')
  const navigate = useNavigate();
  const { setShopSort, setPageShop, setCategory, category} : any = useProductContext()

  const sortBy = (value: string, text: string) => {
    setShopSort(value)
    setDisplay(text)
    setPageShop((prev : any) : any => {
      console.log((prev = 1), "aqui");
      category === '' ? setCategory("All") : category
      const params : any = { page: prev, category: category === '' ? "All" : category, sort: value };
      navigate({
          pathname: "/shop",
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
              onClick={() => sortBy('name', 'Alphabetical A-Z')}> 
              Alphabetical A-Z 
            </div>
            <div 
              className="select checkbox"
              onClick={() => sortBy('name,desc', 'Alphabetical Z-A')}>
              Alphabetical Z-A
            </div>
            <div 
              className="select checkbox"
              onClick={() => sortBy('price,desc', 'Price High to Low')}>
              Higher Price
            </div>
            <div 
              className="select checkbox"
              onClick={() => sortBy('price', 'Price Low to High')}>
              Lower Price 
            </div> 
        </div>
    </div>
    
  )
};

export default ShopSort;