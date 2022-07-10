import { useState } from "react";
import { FaStar } from 'react-icons/fa'
import '../../../scss/Details/Rating.scss';

const colors = {
  orange: "#EA374B",
  grey: "#a9a9a9"
}

type Props = {
  rating: number;
}

const Rating = ({ rating }: Props) => {

  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [hoverValue, setHoverValue] = useState<undefined | number>(undefined);
  const [display, setDisplay] = useState<string | number>('');
  const [appear, setAppear] = useState<boolean>(false);

  const handleClick = (value : number) => {
    setCurrentValue(value);
    setAppear(!appear);
    setTimeout(() => {
      setAppear(false);
    }, 2000);
  };

  console.log(appear);

  const handleMouseOver = (value : number) => {
    setHoverValue(value);
    setDisplay('Your Rating');
  };
  console.log(currentValue);

  const handleMouseLeave = () => {
    setHoverValue(undefined);
    setDisplay('')
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
                color={(hoverValue || currentValue || rating) > i 
                        ? colors.orange : colors.grey}
                onClick={() => handleClick(i + 1)}
                
              />
            </div>
          )
        })
      }
      <h2>{display ? display : rating}</h2>
      <div className={ appear ? "loader" : "close"}></div>
    </div>
  )
};

export default Rating; 