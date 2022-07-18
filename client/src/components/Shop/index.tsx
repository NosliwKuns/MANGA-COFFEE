import CardsProduct from "./CardsProduct";

type Props = {
  setProduct: React.Dispatch<React.SetStateAction<any>>;
  product: any
}

const Shop = ({ setProduct, product }: Props) => {
  return (
    <div className="five">
      <CardsProduct 
        setProduct={setProduct}
        product={product}
      />
    </div>
  )
};

export default Shop;