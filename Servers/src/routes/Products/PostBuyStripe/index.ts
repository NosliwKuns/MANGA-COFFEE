import {Router} from 'express';
import Stripe from "stripe";
import passport from "passport";
import ReadTokenData from '../../../controles/Token/ReadTokenData';
import Product from '../../../models/Products/index';
import User from '../../../models/Users/User';
import sendEmail from '../../../controles/Email/SendEmail';
import NotificationBuy from '../../../controles/Email/Template/NotificacionCompra';
const router = Router();

const stripe = new Stripe(
    "sk_test_51LLrJiAaJyGKFRYYchn8r6wj05opINEVucofBXXorZQWhuq1zFJ1FW3Ys134xp4FuqnQynqh7CaQ6Rhks29Fck4t00fvKC5c6E",
    {apiVersion : "2020-08-27"}
);

router.post("/checkout/:idCompra", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { adrress, product, InfoComprador } = req.body;
    const {idCompra} = req.params;
    const {authorization} = req.headers; 

    let amount: number = 0;
    let ArrrayProducts: [Object] = [{}];
    for (let i = 0; i < product.length; i++) {    
      const producto = await Product.findById(product[i].idProduct);    
      if (producto){
        let stock = producto.stock - product[i].quantity;
        await Product.findByIdAndUpdate((product[i].idProduct), {stock: stock});
        let totProduct = producto.price * product[i].quantity * 100;
        amount += totProduct;
        let DetailProduct = {
          idProduct: product[i].idProduct,
          name: producto.name,
          price: producto.price,
          quantity: product[i].quantity,
          totProduct: totProduct, 
        };
        Object.keys(ArrrayProducts[0]).length?ArrrayProducts.push(DetailProduct): ArrrayProducts = [DetailProduct];
         
      };
    }; 
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      payment_method: idCompra,
      confirm: true,
    }); 
    let dat = new Date();
    const compra = {
      date: dat.toLocaleDateString(),
      idCompra: idCompra,
      produtcs: ArrrayProducts,
      total : amount,
      adrress: adrress,
      name: InfoComprador.name,
      lastName: InfoComprador.lastName,
      telephone: InfoComprador.telephone,
      method: InfoComprador.method,
      email: InfoComprador.email,
    };
    // console.log(payment)
    const data= ReadTokenData(authorization);
    await User.findByIdAndUpdate((data.id), {$push:{historyBuy: [compra]}});
    let template = NotificationBuy(ArrrayProducts, amount);
    if (data.email === InfoComprador.email){
      sendEmail(data.email, 'Notificacion de compra', template);
    }else{
      sendEmail(data.email, 'Notificacion de compra', template);
      sendEmail(InfoComprador.email, 'Notificacion de compra', template)
    };
    
    res.send({ message: "Successull payment" });
  
  } catch (error) {
    console.log(error);
    res.json({leer: 'error de stripe', message: error.raw.message });
  }
});

export default router; 