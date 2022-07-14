import CardsProduct from "./CardsProduct";

type Props = {
  fetchProducts: any;
}

const Shop = ({ fetchProducts }: Props) => {
  const { products } = fetchProducts
  return (
    <div className="five">
      I'm the Store component :D
      <CardsProduct 
      products={products}
      />
    </div>
  )
};

export default Shop;