import {Router} from 'express';
import Stripe from "stripe";
import passport from "passport";
import ReadTokenData from '../../../controles/Token/ReadTokenData';
import Product from '../../../models/Products/index';
import User from '../../../models/Users/User';
const router = Router();

const stripe = new Stripe(
    "sk_test_51LLrJiAaJyGKFRYYchn8r6wj05opINEVucofBXXorZQWhuq1zFJ1FW3Ys134xp4FuqnQynqh7CaQ6Rhks29Fck4t00fvKC5c6E",
    {apiVersion : "2020-08-27"}
);

router.post("/checkout/:idCompra", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { quantity, idProduct } = req.body;
    const {idCompra} = req.params;
    const {authorization} = req.headers; 

    const data= ReadTokenData(authorization);

    const product = await Product.findById(idProduct);        
    if (product){
    let stock = product.stock - quantity;
    await Product.findByIdAndUpdate((idProduct), {stock: stock})

    let amount: number = product.price * quantity

    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: product.description,
      payment_method: idCompra,
      confirm: true,
    });  
    console.log(payment);
    const compra = {
      idCompra: idCompra,
      produtcs: [{
        idProduct: idProduct,
        name: product.name,
        price: product.price,
        quantity: quantity 
      }],
      total : amount,
      // adrress:{
      //   postalCode : ,
      //   country : String,
      //   direction : String,
      //   reference : String
      // },
      // name: String,
      // lastName: ,
      // telephone: ,
      // method: ,
      // email: 
    }
    await User.findByIdAndUpdate((data.id), {historyBuy: [compra]})
    res.send({ message: "Successull payment" });
  }
  } catch (error) {
    console.log(error);
    res.json({ mirar:'este es el lio', message: error.raw.message });
  }
});

export default router;