import { useNavigate } from 'react-router-dom';
import useProductContext from '../../../app/customHooks/useProductContex';
import '../../../scss/Home/Pagination.scss'
import { createSearchParams } from 'react-router-dom';

type Props = {
    /* setPageShop: React.Dispatch<React.SetStateAction<number | string>>;
    setSearchParams: (nextInit: any, navigateOptions?: { replace?: boolean | undefined; state?: any; } | undefined) => void;
    queryShop: string;
    genreShop: string;
    resShop: any */
}

const Pagination = (/* { setPageShop, setSearchParams, queryShop, genreShop, resShop }: Props */) =>{
    const { setPageShop, queryShop, category, resShop, pageShop, setSearchParams } : any = useProductContext();
    const infoShop = resShop.data
    const pages = Array(infoShop?.totalPages).fill(0)

    const handleClick = (e: number) =>{
        setPageShop(e);
        setSearchParams({
          page: e,
          q: queryShop,
          category: category
        })
      };

    const handleClickPrev = () => {
      if (pageShop != 1) {
        setPageShop(Number(pageShop) - 1);
        setSearchParams({
          page: pageShop - 1,
          q: queryShop,
          category: category
        })
      }
    };

    const handleClickNext = () => {
      if (pageShop < pages.length) {
        setPageShop(Number(pageShop) + 1);
        setSearchParams({
          page: pageShop + 1,
          q: queryShop,
          category: category
        })
      }
    };

    if (resShop.isLoading) {
      return (
        <div/>
      )
    };

    return(
      <div className='paginate-container'>
      <button 
        className={pageShop == 1 ? 'btn circle disabled' : 'btn circle'}
        onClick={handleClickPrev}
      > {'<'}
      </button>
        {pages?.map((_, index) =>(
            <span >
                <button
                className={pageShop == index + 1 ? 'btn circle active' : 'btn circle'}
                  onClick={() => handleClick(index+1)}
                >{index +1}
                </button>
            </span>
        ))}
      <button 
        className={pageShop == pages.length ? 'btn circle disabled' : 'btn circle'}
        onClick={handleClickNext}
      > {'>'}
      </button>
    </div>
    )
};

export default Pagination;