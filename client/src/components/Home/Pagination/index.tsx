import { fetchPagination } from '../../../features/manga/mangaSlice'
/* import { useAppDispatch, useAppSelector } from '../../../app/hooks'; */
import '../../../scss/Home/Pagination.scss'

type Props = {
    totalPages: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
  }

const Pagination = ({ totalPages, setPageNumber }: Props) =>{
    /* const dispatch = useAppDispatch(); */
    /* const totalPages:number = useAppSelector(state=> state.mangas.mangas.totalPages) */
    const pages = Array(totalPages).fill(0)

    const handleClick=(e: number) =>{
        /* dispatch(fetchPagination(e)); */
        setPageNumber(e)
    }
    return(
        <div className='btn'>
            {pages?.map((_, index) =>(
                
                <span >
                    <button onClick={() => handleClick(index+1)}>{index +1}</button>
                </span>
            ))}
        </div>
    )
}

export default Pagination;