import { createSearchParams, useNavigate, useLocation } from "react-router-dom";
import '../../../scss/Shop/FilterShop.scss'
import { useEffect } from 'react'
import useProductContext from "../../../app/customHooks/useProductContex";

type Props = {
  /* setPageShop: any
  setGenreShop: any
  resShop: any
  colorFShop: any
  setColorShop: any
  pageShop: any
  shopSort: any
  setshopSort: any */
}

const ShopFilter = (/* { setPageShop, setGenreShop, resShop, colorFShop, setColorShop, pageShop, shopSort, setshopSort } : Props */) => {
  const { setPageShop, setCategory, resShop, colorFShop, setColorFShop, pageShop, shopSort, queryShop} : any = useProductContext();
  const infoShop = resShop.data
  let navigate = useNavigate();
  
  // const handleClick = (genre : any ) => {
  //   console.log('GENREEEEE', genre);
  //   setGenreShop(genre);
  //   setPageShop((prev : any) => {
  //     console.log((prev = 1), "aqui");
  //     const params : any = { page: prev, genre: genre };
  //     /* navigate({
  //       pathname: "/",
  //       search: `?${createSearchParams(params)}`
  //     }); */
  //     window.location.replace(`/shop/?${createSearchParams(params)}`)
  //   });
  // };


  const { pathname, search } = useLocation();

  useEffect(() => {
    if (pathname === "/shop" && search === "") {
      const send = colorFShop.join(',')
      const params : any = send || pageShop || shopSort || queryShop ? { page: pageShop, q: queryShop, category: send, sort: shopSort } : '';
      setCategory(send ? send : '')
      navigate({
        pathname: "/shop",
        search: `?${createSearchParams(params)}`
      });
    }
  },[])

  const checkbox = (e : any) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const newArr = checked
      ? [...colorFShop, value]
      : [...colorFShop.filter((name : any) => name !== value)]

      setColorFShop(newArr)
    const send = newArr.join(',')
    setCategory(send ? send : 'All')
    setPageShop((prev : any) => {
      console.log((prev = 1), "aqui");
      const params : any = send ? { page: prev, category: send, sort: shopSort } : { page: prev};
      navigate({
        pathname: "/shop",
        search: `?${createSearchParams(params)}`
      });
    });
  };

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
            infoShop?.category.map((t : any) => {
              let boolean = colorFShop.includes(t); 
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
    // <>
    // <div onClick={() => handleClick("All")}>All</div>
    // { 
    //   infoShop?.category.map( (genre: string) => {
    //     return (
    //       <div
    //         key={`${genre}`}
    //         onClick={() => handleClick(genre)}
    //       >
    //         {genre}
    //       </div>
    //     )
    //   })
    // }
    // </>
  )
};

export default ShopFilter;