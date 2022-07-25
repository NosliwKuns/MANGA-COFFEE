import { createSearchParams, useNavigate, useLocation } from "react-router-dom";
import '../../../scss/Shop/FilterShop.scss'
import { useEffect } from 'react'

type Props = {
  setPageShop: any
  setGenreShop: any
  resShop: any
  colorF: any
  setColorF: any
  pageShop: any
}

const ShopFilter = ({ setPageShop, setGenreShop, resShop, colorF, setColorF, pageShop } : Props) => {
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
  console.log(pageShop, "jojo")


  useEffect(() => {
    if (pathname === "/shop" && search === "") {
      const send = colorF.join(',')
      /* setGenre(send) */

      const params : any = send || pageShop ? { page: pageShop, genre: send } : '';
      setGenreShop(send ? send : '')
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
      ? [...colorF, value]
      : [...colorF.filter((name : any) => name !== value)]

    setColorF(newArr)
    const send = newArr.join(',')
    setGenreShop(send ? send : 'All')
    setPageShop((prev : any) => {
      console.log((prev = 1), "aqui");
      const params : any = send ? { page: prev, genre: send } : { page: prev};
      navigate({
        pathname: "/shop",
        search: `?${createSearchParams(params)}`
      });
      /* window.location.replace(`/?${createSearchParams(params)}`) */
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