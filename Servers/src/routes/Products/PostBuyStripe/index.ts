import {Router} from 'express';
import Stripe from "stripe";
import passport from "passport";
import ReadTokenData from '../../../controles/Token/ReadTokenData';
import Product from '../../../models/Products/index';
const router = Router();

const stripe = new Stripe(
    "sk_test_51LLrJiAaJyGKFRYYchn8r6wj05opINEVucofBXXorZQWhuq1zFJ1FW3Ys134xp4FuqnQynqh7CaQ6Rhks29Fck4t00fvKC5c6E",
    {apiVersion : "2020-08-27"}
);

router.post("/checkout:idCompra", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { quantity, idProduct } = req.body;
    const {idCompra} = req.params;
    const {authorization} = req.headers; 

    const data= ReadTokenData(authorization);
    const product = await Product.findById(idProduct);
    let amount = product.price * quantity
    console.log(product.price)
    const payment = await stripe.paymentIntents.create({
      amount: 100,
      currency: "USD",
      description: product?.description,
      payment_method: idCompra,
      confirm: true,
    });
    console.log(payment);
    res.send({ message: "Successull payment" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.raw.message });
  }
});

export default router;