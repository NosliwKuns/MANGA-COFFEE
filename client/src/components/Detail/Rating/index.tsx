import { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa'
import { fetchUpdateRating } from "../../../features/manga/mangaSlice";
import '../../../scss/Details/Rating.scss';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import '../../../scss/Details/Comments.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';


const colors = {
  orange: "#EA374B",
  grey: "#a9a9a9"
}


const Rating = () => {

  const stars = Array(5).fill(0);
  const [hoverValue, setHoverValue] = useState<undefined | number>(undefined);
  const [display, setDisplay] = useState<string | number>('');
  const [appear, setAppear] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { _id } = useAppSelector((state) => state.mangas.manga);
  const { rating } = useAppSelector((state) => state.mangas);
  const { user, verificated } = useAppSelector(state => state.user)
  const navigate = useNavigate();


  const handleClick = (value : number) => {
    dispatch(fetchUpdateRating(_id, value))
    setAppear(!appear);
    setTimeout(() => {
      setAppear(false);
    }, 2000);
  };

  const handleMouseOver = (value : number) => {
    setHoverValue(value);
    setDisplay('Your Rating');
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
    setDisplay('')
  };

  const PopUp = () => {
    if(!user && !verificated) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        html: <><BsFillInfoCircleFill size={55}/> <h2>To rate, you must Sign In!</h2></>,
        showCloseButton: true,
        focusConfirm: false,
        background: "#212429",
        confirmButtonText:
        <div onClick={() => navigate("/logeo", { replace: true })} className="divSignIn">Sign In</div>,
        confirmButtonAriaLabel: 'Sign In',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'confirmButton'
        }
      })
    } else if(user && !verificated) {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        html: <><BsFillInfoCircleFill size={55}/> <h1>Please verify your account!</h1> <h3>Check your e-mail to verify your account</h3></>,
        showCloseButton: true,
        focusConfirm: false,
        background: "#212429",
        confirmButtonText:
          'Ok',
        confirmButtonAriaLabel: 'Ok',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'confirmButton'
        }
      })
    }
  }

  return (
    <div className={ appear ? "star-widget opacity" : "star-widget"}>
      {
        stars.map((_, i) => {
          return (
            <div
            className="star"
            onMouseOver={() => handleMouseOver(i + 1)}
            onMouseLeave={handleMouseLeave}
            >
              <FaStar 
                key={i}
                size={24}
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
                color={(hoverValue || rating - .5 ) > i
                        ? colors.orange : colors.grey}
                onClick={() => user && verificated ? handleClick(i + 1) : PopUp()}
                
              />
            </div>
          )
        })
      }
      <h2>{display ? display : rating.toFixed(1)}</h2>
      <div className={ appear ? "loader" : "close"}></div>
    </div>
  )
};

export default Rating; 