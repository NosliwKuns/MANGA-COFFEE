import { getFavManga, fetchDeleteFavorites } from '../../../features/user/userSlice'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector} from '../../../app/hooks';
import useHeaders from "../../../app/headers";
import { Link } from 'react-router-dom'



const Favorites = () =>{
    const dispatch= useAppDispatch();
    const { id, favorites, token, user, verificated } = useAppSelector(state=> state.user)
    const headers = useHeaders(token)

    const handleClick = (mangaid: any) => {
        if(user && !verificated) {
            alert('Please verify your account!')
        } else if(user && verificated) {
            dispatch(fetchDeleteFavorites(id, mangaid, headers))
            dispatch(getFavManga(id, headers))
        } else if(!user && !verificated){
            alert('To add Manga to favorites, you must Sign In!')
        }
    }

    
    useEffect(()=>{
        dispatch(getFavManga(id, headers))
    },[dispatch, id])

    return(
        <div>{favorites?.map(f=>{
            return(
                <div>
                    <button onClick={() => handleClick(f._id)}>X</button>
                    <Link to={`/mangas/detail/${f._id}`}>
                        <div key={f._id}>
                        <section>
                            <img src={`${f.cover_image}`} alt={`cover_page_${f._id}`} height={'200px'} />
                        </section>
                        <header>{f.title}</header>
                        </div>
                    </Link>
                </div>
            )
            
        })}</div>
    )
}

export default Favorites;