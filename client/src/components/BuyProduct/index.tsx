import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  fetchDetailManga,
  fetchModifyStock,
} from "../../features/products/productsSlice";
import useHeaders from "../../app/headers";
import "../../scss/Shop/buyProduct.scss";
import { validate } from "./func/validate";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaRegCreditCard } from "react-icons/fa";

type Props = {
  clickBuy: any
  setProduct: any
}

const BuyProduct = ({clickBuy, setProduct}: Props) => {
  const { idProduct } = useParams();
  const [input, setInput] = useState<any>({
    postalCode: "0",
    country: "",
    direction: "",
    reference: "",
    name: "",
    lastName: "",
    telephone: "",
    email: "",
  });
  const [errors, setErrors] = useState<any>({
    postalCode: "insert postal code",
    country: "insert country",
    direction: "insert direction",
    reference: "insert reference",
    name: "insert name",
    lastName: "insert last name",
    telephone: "insert telephone",
    email: "insert email",
  });
  const stripe: any = useStripe();
  const elements: any = useElements();
  const [loading, setLoading] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector((state) => state.products);
  const { name, product_image, price } = productDetail;
  const prod: any = localStorage.getItem('prod')
  const realProd = JSON.parse(prod)
  const cart: any = localStorage.getItem('test')
  const allCart = JSON.parse(cart)
  

  const handleChange = (event: any) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const token = useAppSelector((state) => state.user.token);
  const headers = useHeaders(token);
  const array = clickBuy === "cartBtn" ? allCart : clickBuy === "indBuy" ? realProd : ''

  useEffect(() => {
    dispatch(fetchDetailManga(idProduct));
  }, [dispatch]);

  const appearance = {
    theme: 'stripe'
  };
  


  const handleSubmit = async (e: any) => {
    const initBuy = array.map((e:any)=>{
      return {idProduct : e._id, quantity: e.amount ? e.amount : 1}
  })
    e.preventDefault();

    if (
      errors.postalCode ||
      errors.country ||
      errors.direction ||
      errors.reference ||
      errors.name ||
      errors.lastName ||
      errors.telephone ||
      errors.email
    ) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        html: (
          <>
            <h1>Please fill in all the spaces correctly</h1>
          </>
        ),
        position: "center",
        icon: "error",
        title: "Oops...",
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        focusConfirm: false,
        background: "#212429",
        buttonsStyling: false,
        customClass: {
          confirmButton: "confirmButton",
        },
      });
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);
    if (!error) {
      const { id } = paymentMethod;
      try {
        const envio = {
          product: initBuy,
          adrress: {
            postalCode: input.postalCode,
            country: input.country,
            direction: input.direction,
            reference: input.reference,
          },
          InfoComprador: {
            name: input.name,
            lastName: input.lastName,
            telephone: input.telephone,
            method: "card",
            email: input.email,
          },
        };
        console.log(envio);
        const { data } = await axios.post(
          `https://manga-coffee.herokuapp.com/api/products/checkout/${id}`,
          envio,
          headers
        );
        console.log(data);
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      if (!loading) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          html: (
            <>
              <h1>Purchase sucessfuly completed</h1>
            </>
          ),
          position: "center",
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
          showCloseButton: true,
          focusConfirm: false,
          background: "#212429",
          buttonsStyling: false,
          customClass: {
            confirmButton: "confirmButton",
          },
        });
      }
      setInput({
        postalCode: "0",
        country: "",
        direction: "",
        reference: "",
        name: "",
        lastName: "",
        telephone: "",
        email: "",
      })
      if (array === allCart) {
        setProduct([])
      }
    }
  };

  const handleInputChange = (e: any) => {
    setNumberOfGuests(e.target.value);
    console.log(numberOfGuests);
  };

  const handleBuy = () => {
    // falta agregar esto mismo en el otro archivo que es el buy pero del carrito
    console.log(numberOfGuests);
    const stock = `-${numberOfGuests}`;
    dispatch(fetchModifyStock(idProduct, stock));
  };
  let total: any = []
  let totalQuantity: any = []
  
  array && array.map((a: any) => {
    total.push(a.price)
    a.amount ? totalQuantity.push(a.amount) : totalQuantity.push(1)
  })
  
  let subTotal: any = total.reduce((a: any, b: any) => a + b,0) 
  let subTotalQuantity: any = totalQuantity.reduce((a: any, b: any) => a + b,0) 


  return (
    <div className="five">
      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="info-user-form">
          <div className="wrapper">
          <h2>shipping information</h2>
      <div className="grid-inputs">
        <div className="space">
          <label htmlFor="emial">Email :</label>
          <input
            name="email"
            type="text"
            value={input.email}
            onChange={handleChange}
          />
          <p>{errors.email}</p>
        </div>

        <div className="space">
          <label htmlFor="name">Name :</label>
          <input
            name="name"
            type="text"
            value={input.name}
            onChange={handleChange}
          />
          {errors.name.length > 1 && <p>{errors.name}</p>}
        </div>
        <div className="space">
          {" "}
          <label htmlFor="lastName">Last Name :</label>
          <input
            name="lastName"
            type="text"
            value={input.lastName}
            onChange={handleChange}
          />
          {errors.lastName.length > 1 && <p>{errors.lastName}</p>}
        </div>

        <div className="space">
          {" "}
          <label htmlFor="country">Country :</label>
          <input
            name="country"
            type="text"
            value={input.country}
            onChange={handleChange}
          />
          {errors.country.length > 1 && <p>{errors.country}</p>}
        </div>

        <div className="space">
          {" "}
          <label htmlFor="postalCode">Postal Code :</label>
          <input
            name="postalCode"
            type="text"
            value={input.postalCode}
            onChange={handleChange}
          />
          {errors.postalCode.length > 1 && <p>{errors.postalCode}</p>}
        </div>

        <div className="space">
          {" "}
          <label htmlFor="direction">Direction :</label>
          <input
            name="direction"
            type="text"
            value={input.direction}
            onChange={handleChange}
          />
          {errors.direction.length > 1 && <p>{errors.direction}</p>}
        </div>

        <div className="space">
          {" "}
          <label htmlFor="telephone">Telephone :</label>
          <input
            name="telephone"
            type="text"
            value={input.telephone}
            onChange={handleChange}
          />
          {errors.telephone.length > 1 && <p>{errors.telephone}</p>}
        </div>

        <div className="space">
          {" "}
          <label htmlFor="reference">Reference :</label>
          <input
            name="reference"
            type="text"
            value={input.reference}
            onChange={handleChange}
          />
          {errors.reference.length > 1 && <p>{errors.reference}</p>}
        </div>
      </div>
      <div className="payment-container">
        <h2>Payment method</h2>
        <div 
          className="payment-text"> 
            <FaRegCreditCard size={23} />   
            Credit or debit card | Visa, Mastercard and more!
        </div>
        <div className="payment">
          <CardElement />
        </div>
        <div className="total">{`Total: $/. ${subTotal*subTotalQuantity}`}</div>
        <button
          className="space btn_buy"
          disabled={!stripe}
          onClick={() => handleBuy()}
        >
          {loading ? "Loading" : "Checkout"}
        </button>
      </div>
          </div>
        </form>
      <section className="product-view-container">
        <h2>Your products</h2>
        <div className="sub-section">
          {array &&  array.map((p: any) => {
            return (
              <div className="product-content">
                <img
                  src={p.product_image}
                  alt={`product image `}
                  className={"image_product space"}
                />
                <div>
                  <h3>{p.name}</h3>
                  <h3 className="space">{`Price: $/. ${p.price}`}</h3>
                  <h3 className="space">{p.amount && p.amount > 1 ? `Subtotal: $/. ${p.price*p.amount}` : ""}</h3>
                  <h3>{p.amount > 1 ? `Quantity: ${p.amount}` : ""}</h3>
                </div>
              </div>
            )})}
        </div>
        
      </section>
    </div>
      
    </div>
    
  );
};

export default BuyProduct;
