import { useEffect } from 'react';
import { useAppDispatch, useAppSelector} from '../../../app/hooks';
import useHeaders from "../../../app/headers";
import { Link } from 'react-router-dom'
import { FetchGetWishlist, fetchDeleteWishlist } from '../../../features/user/userSlice'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { RiErrorWarningFill } from 'react-icons/ri';

const WishList = () => {
    const dispatch= useAppDispatch();
    const { id, wishlist, token} = useAppSelector(state=> state.user)
    const headers = useHeaders(token)

    const handleClick = (productId: any) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            html: <><RiErrorWarningFill size={55}/> <h1>Are you sure you want to delete this product from your Wishlist?</h1><h3>You won't be able to revert this!</h3></>,
            showCloseButton: true,
            focusConfirm: false,
            showCancelButton: true,
            background: "#212429",
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonAriaLabel: 'Delete it',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'confirmButtonDelete',
                cancelButton: 'cancelButtonDelete'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(fetchDeleteWishlist(id, productId, headers))
                dispatch(FetchGetWishlist(id, headers))
            MySwal.fire({
                icon: 'success',
                html: <><h1>Deleted!</h1><h3>This product has been deleted successfully.</h3></>,
                focusConfirm: false,
                confirmButtonColor: "#ea374b",
                background: "#212429",
                confirmButtonText: 'Ok',
                buttonsStyling: false,
                customClass: {
                confirmButton: 'confirmButton',
                }
            })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
            MySwal.fire({
                icon: 'error',
                html: <><h1>Cancelled!</h1><h3>This product is safe :)</h3></>,
                focusConfirm: false,
                confirmButtonColor: "#ea374b",
                background: "#212429",
                confirmButtonText: 'Ok',
                buttonsStyling: false,
                customClass: {
                confirmButton: 'confirmButton',
                }
            })
            }
        })
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