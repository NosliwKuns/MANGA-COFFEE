import CardsProduct from "./CardsProduct";

type Props = {
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any
}

const Shop = ({ setProduct, product }: Props) => {
  return (
    <div className="five">
      I'm the Store component :D
      <CardsProduct 
        setProduct={setProduct}
        product={product}
      />
    </div>
  )
};

export default Shop;