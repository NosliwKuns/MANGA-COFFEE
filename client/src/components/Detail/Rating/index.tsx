import { useState, useEffect } from "react";
import { FaStar } from 'react-icons/fa'
import { fetchUpdateRating } from "../../../features/manga/mangaSlice";
import '../../../scss/Details/Rating.scss';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';


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
                onClick={() => handleClick(i + 1)}
                
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