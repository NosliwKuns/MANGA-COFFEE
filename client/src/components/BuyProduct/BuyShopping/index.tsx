import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useState } from 'react'
import useHeaders from '../../../app/headers';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { validate } from '../func/validate';

const BuyShopping = () => {
    const [input, setInput] = useState<any>({
      postalCode: "",
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

    const localShop:any  = localStorage.getItem('test')
    const shop = JSON.parse(localShop);
    const stripe: any = useStripe();
    const elements: any = useElements();

    const [loading, setLoading] = useState(false);

    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const dispatch = useAppDispatch();
    const { productDetail } = useAppSelector((state) => state.products);
    const { name, product_image, price } = productDetail;
    console.log(shop,'---------------------------------')
  
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
  
  
    const handleSubmit = async (e: any) => {
        const initBuy = shop.map((e:any)=>{
            return {idProduct : e.id, quantity: e.amount}
        })
        console.log(initBuy,'initBuyyyyyy')
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
      )
        return;
  
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
            `http://localhost:5000/api/products/checkout/${id}`,
            envio,
            headers
          );
          console.log(data);
          elements.getElement(CardElement).clear();
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };
  
    const handleInputChange = (e: any) => {
      setNumberOfGuests(e.target.value);
      console.log(numberOfGuests);
    };
  
    return (
      <form onSubmit={handleSubmit} className="colorrr">
        
        <div>
          {
           shop.length && shop.map((e:any)=>{
                <h2>{e.price}</h2>
            })
          }
          <div className="space">
            <CardElement />
          </div>
          <input
            name="numberOfGuests"
            type="number"
            value={numberOfGuests}
            onChange={handleInputChange}
            className="space"
          />
          <button className="space btn_buy" disabled={!stripe}>
            {loading ? "Loading" : "Buy"}
          </button>
        </div>
  
        <div>
        <h1 className="space">Your Data</h1>
          <div className="space">
            <label htmlFor="emial">Email :</label>
            <input
              name="email"
              type="text"
              value={input.email}
              onChange={handleChange}
            />
            {errors.email.length > 1 && <p>{errors.email}</p>}
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
  
          <div className="space" >
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
      </form>
  )
}

export default BuyShopping