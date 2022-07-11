import { fetchPagination } from '../../../features/manga/mangaSlice'
import { useAppDispatch } from '../../../app/hooks';

const Pagination = () =>{
    const dispatch = useAppDispatch();
    const totalPages:number=3
    const pages = Array(totalPages).fill(0)

    const handleClick=(e:any) =>{
        const back = `page=${e}`
        dispatch(fetchPagination(back));
    }
    return(
        <div>
            {pages?.map((_, index) =>(
                <li>
                    <button onClick={() => handleClick(index)}>{index +1}</button>
                </li>
            ))}
        </div>
    )
}

export default Pagination;