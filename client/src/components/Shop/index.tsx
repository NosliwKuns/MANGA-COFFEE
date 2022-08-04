import CardsProduct from "./CardsProduct";
import PaginationShop from './Pagination/index'
import ShopFilter from './ShopFilter/index'
import ShopSort from './ShopSort/ShopSort'

type Props = {
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any
  /* resShop: any
  setPageShop: any
  genreShop: any
  queryShop: any
  setSearchParams: any
  setGenreShop: any
  setQueryShop: any
  pageShop: any
  colorFShop: any
  setColorShop: any
  shopSort: string
  setshopSort: React.Dispatch<React.SetStateAction<string>> */
}

const Shop = ({ setProduct, product/* , resShop, setPageShop, genreShop, queryShop, setSearchParams, setGenreShop, setQueryShop, colorFShop, setColorShop, pageShop, shopSort, setshopSort */ }: Props) => {
  return (
    <div className="five">
      <ShopSort 
        /* shopSort={shopSort}
        setshopSort={setshopSort}
        setPageShop={setPageShop}
        setGenreShop={setGenreShop}
        genreShop={genreShop} */
        />
      <ShopFilter
      /* shopSort={shopSort}
      setshopSort={setshopSort}
      setPageShop={setPageShop}
      setGenreShop={setGenreShop}
      resShop={resShop}
      colorFShop= {colorFShop}
      setColorShop= {setColorShop}
      pageShop={pageShop} */
      />
      <CardsProduct 
        setProduct={setProduct}
        product={product}
        /* resShop={resShop}
        genreShop={genreShop} */
      />
      <PaginationShop
      /* resShop={resShop}
      setPageShop={setPageShop}
      genreShop={genreShop}
      queryShop={queryShop}
      setSearchParams={setSearchParams} */
      />
    </div>
  )
};

export default Shop;