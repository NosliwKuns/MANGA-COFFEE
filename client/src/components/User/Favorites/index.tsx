import { getFavManga, fetchDeleteFavorites } from '../../../features/user/userSlice'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector} from '../../../app/hooks';
import useHeaders from "../../../app/headers";
import { Link } from 'react-router-dom'



const Favorites = () =>{
    const dispatch= useAppDispatch();
    const { id, favorites} = useAppSelector(state=> state.user)
    const { token } = useAppSelector((state) => state.user);
    const headers = useHeaders(token)

    const handleClick = (mangaid: any) => {
        dispatch(fetchDeleteFavorites(id, mangaid, headers))
        dispatch(getFavManga(id, headers))
    }

    
    useEffect(()=>{
        dispatch(getFavManga(id, headers))
    },[dispatch, id])

    return(
        <div>{favorites?.map(f=>{
            return(
                <div>
                    <button onClick={() => handleClick(f._id)}>X</button>
                    <Link to={`/detail/${f._id}`}>
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