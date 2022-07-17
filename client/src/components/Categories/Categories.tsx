import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchGetGenres, fetchMangaByGenres } from "../../features/manga/mangaSlice";
import { Link } from 'react-router-dom'


const Categories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.mangas.genres)
    useEffect(() => {
        dispatch(fetchGetGenres())
    },[dispatch])
    
    return (
    <div>  
        {categories?.map(c => {
            return (
                <div>
                    <Link to={`/categories/${c}`}>
                        <button>{c}</button>
                    </Link>
                </div>
            )
        })}
    </div>
    )
}
export default Categories