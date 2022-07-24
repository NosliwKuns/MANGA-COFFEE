import { getFavManga, fetchDeleteFavorites } from '../../../features/user/userSlice'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector} from '../../../app/hooks';
import useHeaders from "../../../app/headers";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { RiErrorWarningFill } from 'react-icons/ri';



const Favorites = () =>{
    const dispatch= useAppDispatch();
    const { id, favorites, token} = useAppSelector(state=> state.user)
    const headers = useHeaders(token)
    const handleClick = (mangaid: any) => {
        const MySwal = withReactContent(Swal)
    MySwal.fire({
        html: <><RiErrorWarningFill size={55}/> <h1>Are you sure you want to delete this Manga fron favorites?</h1><h3>You won't be able to revert this!</h3></>,
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
        if (mangaid === id) {
            dispatch(fetchDeleteFavorites(id, mangaid, headers))
            dispatch(getFavManga(id, headers))
        }
        MySwal.fire({
            icon: 'success',
            html: <><h1>Deleted!</h1><h3>This Manga has been deleted successfully.</h3></>,
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
            html: <><h1>Cancelled!</h1><h3>This Manga is safe :)</h3></>,
            focusConfirm: false,
            confirmButtonColor: "#ea374b",
            background: "#212429",
            confirmButtonText: 'Ok',buttonsStyling: false,
            customClass: {
            confirmButton: 'confirmButton',
            }
        })
        }
    })
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