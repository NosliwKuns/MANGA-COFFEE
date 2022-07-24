import CardsProduct from "./CardsProduct";
import PaginationShop from './Pagination/index'

type Props = {
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any
  resShop: any
  setPageShop: any
  genreShop: any
  queryShop: any
  setSearchParams: any
}

const Shop = ({ setProduct, product, resShop, setPageShop, genreShop, queryShop, setSearchParams }: Props) => {
  return (
    <div className="five">
      <CardsProduct 
        setProduct={setProduct}
        product={product}
        resShop={resShop}
      />
      <PaginationShop
      resShop={resShop}
      setPageShop={setPageShop}
      genreShop={genreShop}
      queryShop={queryShop}
      setSearchParams={setSearchParams}
      />
    </div>
  )
};

export default Shop;