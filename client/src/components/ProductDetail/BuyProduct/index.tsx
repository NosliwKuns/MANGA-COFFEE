import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams } from "react-router-dom";
import { fetchDetailManga } from "../../../features/products/productsSlice";
import useHeaders from "../../../app/headers";
import "../BuyProduct/buyProduct.scss"

const BuyProduct = () => {
    const {idProduct} = useParams()
  const stripe: any = useStripe();
  const elements: any = useElements();
  const [loading, setLoading] = useState(false);
  const [numberOfGuests,setNumberOfGuests] = useState(1)
  const dispatch = useAppDispatch();
  const { product_image, price, name } = useAppSelector(
      (state) => state.products.productDetail
      );
      const token = useAppSelector((state) => state.user.token)
      const headers = useHeaders( token )
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);
    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(`http://localhost:5000/api/products/checkout/${id}`, {
            idProduct,
          quantity : numberOfGuests
        },  headers );

        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const handleInputChange = (e : any) =>{
    setNumberOfGuests(e.target.value)
    console.log(numberOfGuests)
  }

  useEffect(()=>{
    dispatch(fetchDetailManga(idProduct))
  },[])

  return (
    <form onSubmit={handleSubmit} className="colorrr">
      <h2>{name}</h2>
      <img src={product_image} alt={`product image ${name}`} />
      <h3>{`$/. ${price}`}</h3>
      <div >
        <CardElement />
      </div>
      <button className="btn btn-success" disabled={!stripe}>
        {loading ? "Loading" : "Buy"}
      </button>
      <input
            name="numberOfGuests"
            type="number"
            value={numberOfGuests}
            onChange={handleInputChange} />
    </form>
  );
};

export default BuyProduct;
