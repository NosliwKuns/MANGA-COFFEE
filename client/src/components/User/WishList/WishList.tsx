import { useEffect } from 'react';
import { useAppDispatch, useAppSelector} from '../../../app/hooks';
import useHeaders from "../../../app/headers";
import { Link } from 'react-router-dom'
import { FetchGetWishlist, fetchDeleteWishlist } from '../../../features/user/userSlice'

const WishList = () => {
    const dispatch= useAppDispatch();
    const { id, wishlist, token} = useAppSelector(state=> state.user)
    const headers = useHeaders(token)

    const handleClick = (productId: any) => {
        dispatch(fetchDeleteWishlist(id, productId, headers))
        dispatch(FetchGetWishlist(id, headers))
    }

    useEffect(()=>{
        dispatch(FetchGetWishlist(id, headers))
    },[dispatch, id])

    return (
        <div>{wishlist?.map(p=>{
            return(
                <div>
                    <button onClick={() => handleClick(p._id)}>X</button>
                    <Link to={`/product/${p._id}`}>
                        <div key={p._id}>
                        <section>
                            <img src={`${p.product_image}`} alt={`cover_page_${p._id}`} height={'200px'} />
                        </section>
                        <header>{p.name}</header>
                        </div>
                    </Link>
                </div>
            )
            
        })}</div>
    )
}

export default WishList