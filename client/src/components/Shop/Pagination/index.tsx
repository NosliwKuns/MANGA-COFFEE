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
    const { setPageShop, queryShop, category, resShop } : any = useProductContext();
    const infoShop = resShop.data
    const pages = Array(infoShop?.totalPages).fill(0)
    const navigate = useNavigate()

    const handleClick = (e: number) =>{
        setPageShop(e);
        let params : any;
        if (queryShop) {
          params = {q: queryShop, page: e}       
        }
        if (category) {
          params = {category: category, page: e}
        } else {
          params = {page: e}
        }
        navigate({
          pathname: '/shop',
          search: `?${createSearchParams(params)}`
        })
      };
    return(
        <div className='btn'>
            {pages?.map((_, index) =>(
                
                <span >
                    <button onClick={() => handleClick(index+1)}>{index +1}</button>
                </span>
            ))}
        </div>
    )
};

export default Pagination;