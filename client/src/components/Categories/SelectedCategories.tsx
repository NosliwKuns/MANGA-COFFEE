import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchMangaByGenres, fetchCleanCategories } from "../../features/manga/mangaSlice";

const SelectedCategories = () => {
    const category = useParams<string>()
    const genre: any = category.genre
    const mangas = useAppSelector(state => state.mangas.category)
    console.log("DONDE LO GUARDAAAAA", mangas);
    console.log("CATEGORYYYYYYYY", genre);
    
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMangaByGenres(genre))
        return () => {
            dispatch(fetchCleanCategories())
        }
    },[dispatch])
    
    return (
        <div>
            {mangas?.map(m => {
                return(
                    <Link to={`/detail/${m._id}`}>
                        <div key={m._id}>
                        <section>
                            <img src={`${m.cover_image}`} alt={`cover_page_${m.title}`} height={'200px'} />
                        </section>
                        <header>{m.title}</header>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default SelectedCategories