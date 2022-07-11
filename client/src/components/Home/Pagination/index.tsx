import { fetchPagination, fetchTotalPages } from '../../../features/manga/mangaSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import '../../../scss/Home/Pagination.scss'

const Pagination = () =>{
    const dispatch = useAppDispatch();
    const totalPages:number = useAppSelector(state=> state.mangas.totalPages)
    const pages = Array(totalPages).fill(0)

    useEffect(()=>{
        dispatch(fetchTotalPages())
    },[dispatch])

    const handleClick=(e:any) =>{
        const back = `page=${e}`
        dispatch(fetchPagination(back));
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