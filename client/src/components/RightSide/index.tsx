import PopularMangas from './PopularMangas';
import UserButtons from './../UserButtons/index';

type Props = {
  /* setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any */
  setClickBuy: any
}
const LeftSide = ({ /* setProduct, product, */ setClickBuy }: Props) => {

  return (
    <div className="six">
      <UserButtons 
        /* product={product}  
        setProduct={setProduct} */
        setClickBuy={setClickBuy}/>
      <PopularMangas />
      {/* <div className="greeting">
        {
          user 
          ? <div>
            <h2 style={{color: '#FFFFFF'}} >Welcome, </h2><h2 style={{color: '#EA374B'}} color={'red'}>{user}!</h2> 
          </div>
          :
          <div>
            <h2 style={{color: '#FFFFFF'}} >Welcome to </h2> 
            <h2 style={{color: '#EA374B'}} color={'red'}>Manga Coffee!</h2> 
          </div>
        }
      </div> */}
    </div>
  )
};

export default LeftSide;