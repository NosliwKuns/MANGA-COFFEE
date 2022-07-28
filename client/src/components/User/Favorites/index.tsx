import { getFavManga, fetchDeleteFavorites } from '../../../features/user/userSlice'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector} from '../../../app/hooks';
import useHeaders from "../../../app/headers";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { RiErrorWarningFill } from 'react-icons/ri';
import NotFavOrWish from "../NotFavOrWish";
import '../../../scss/User/Favorites.scss'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { gridAnimation, cardAnimation, h3Animation } from '../../../Animation.js';



const Favorites = () =>{
    const dispatch= useAppDispatch();
    const navigate = useNavigate()
    const { id, favorites, token} = useAppSelector(state=> state.user)
    const headers = useHeaders(token)
    const handleClick = (mangaid: any) => {
        const MySwal = withReactContent(Swal)
    MySwal.fire({
        html: <><RiErrorWarningFill size={55}/> <h1>Are you sure you want to delete this Manga from favorites?</h1><h3>You won't be able to revert this!</h3></>,
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
            dispatch(fetchDeleteFavorites(id, mangaid, headers))
            dispatch(getFavManga(id, headers))
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
        <div className='favDivContainer'>
                    {
                    favorites.length?
                    favorites?.map((f: any)=>{
                    return(
                        <motion.div
                        variants={gridAnimation}
                        animate='show'
                        exit='hide'
                        className="FavoriteCardsContainer">
                            <AnimateSharedLayout>
                                    <motion.div
                                    variants={cardAnimation}
                                    key={f._id}
                                    layout
                                    className='divContainerMangaFav'>
                                        <button onClick={() => handleClick(f._id)} className="DeleteButtonFavorites">X</button>
                                    <section>
                                        <img src={`${f.cover_image}`} alt={`cover_page_${f._id}`} onClick={() => navigate(`/mangas/detail/${f._id}`)}/>
                                    </section>
                                    <header className='MangaTitleFavorites' onClick={() => navigate(`/mangas/detail/${f._id}`)}>{f.title}</header>
                                    </motion.div>
                            </AnimateSharedLayout>
                        </motion.div>
                    )
                    
                })
                :<NotFavOrWish/>
                }
        </div>
    )
}

export default Favorites;