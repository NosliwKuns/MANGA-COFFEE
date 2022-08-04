import '../../../scss/Home/Pagination.scss'/*  */
import { useContext } from 'react';
import { MangaContext } from '../../../context/mangaContex';
import useMangaContext from '../../../app/customHooks/useMangaContext';

type Props = {
    /* setPage: React.Dispatch<React.SetStateAction<number | string>>; */
    setSearchParams: (nextInit: any, navigateOptions?: { replace?: boolean | undefined; state?: any; } | undefined) => void;
    /* res: any; */
    /* query: string;
    genre: string; */
}

const Pagination = ({ /* res, */ /* setPage, */ setSearchParams/* , query, genre  */}: Props) =>{

    /* const { res } : any = useContext(MangaContext) */
    const { res, setPage, query, genre, page } : any = useMangaContext()
    const info = res.data;
    const pages = Array(info?.totalPages).fill(0);

    const handleClick = (e: number) =>{
        setPage(e);
        setSearchParams({
          page: e,
          q: query,
          genre: genre,
        })
        if(res.isLoading) {
          alert("LOADING True")
        }
    };

    const handleClickPrev = () => {
      if (page != 1) {
        setPage(Number(page) - 1);
        setSearchParams({
          page: page - 1,
          q: query,
          genre: genre
        })
      }
    };

    const handleClickNext = () => {
      if (page < pages.length) {
        setPage(Number(page) + 1);
        setSearchParams({
          page: page + 1,
          q: query,
          genre: genre
        })
      }
    }

      if (res.isLoading) {
        return (
          <div/>
        )
      }

    console.log(page, genre, 'PAGEEEE')

    return(
        <div className='paginate-container'>
          <button 
            className={page == 1 ? 'btn circle disabled' : 'btn circle'}
            onClick={handleClickPrev}
          > {'<'}
          </button>
            {pages?.map((_, index) =>(
                <span >
                    <button
                    className={page == index + 1 ? 'btn circle active' : 'btn circle'}
                      onClick={() => handleClick(index+1)}
                    >{index +1}
                    </button>
                </span>
            ))}
          <button 
            className={page == pages.length ? 'btn circle disabled' : 'btn circle'}
            onClick={handleClickNext}
          > {'>'}
          </button>
        </div>
    )
};

export default Pagination;