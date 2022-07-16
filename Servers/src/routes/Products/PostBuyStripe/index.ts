import {Router} from 'express';
import Stripe from "stripe";
import passport from "passport";
import ReadTokenData from '../../../controles/Token/ReadTokenData';
import Product from '../../../models/Products/index';
import User from '../../../models/Users/User';
//import sendEmail from '../../../controles/Email/SendEmail';
//import NotificationBuy from '../../../controles/Email/Template/NotificacionCompra';
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
    product.forEach( async (element: any) =>{
      const producto = await Product.findById(element.idProduct);        
      if (producto){
        let stock = producto.stock - element.quantity;
        await Product.findByIdAndUpdate((element.idProduct), {stock: stock});
        let totProduct = producto.price * element.quantity * 100;
        amount += totProduct;
        let DetailProduct = {
          idProduct: element.idProduct,
          name: producto.name,
          price: producto.price,
          quantity: element.quantity,
          totProduct: totProduct, 
        }
        Object.keys(ArrrayProducts[0]).length?ArrrayProducts.push(DetailProduct): ArrrayProducts = [DetailProduct]   
      }
    });
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      payment_method: idCompra,
      confirm: true,
    });  
    const compra = {
      idCompra: idCompra,
      produtcs: ArrrayProducts,
      total : amount,
      adrress: adrress, 
      InfoComprador: InfoComprador,
    }
    console.log(payment)
    const data= ReadTokenData(authorization);
    await User.findByIdAndUpdate((data.id), {$push:{historyBuy: [compra]}})
    //let template = NotificationBuy()
    //sendEmail(data.email, 'Notificacion de compra', template)
    res.send({ message: "Successull payment" });
  
  } catch (error) {
    console.log(error);
    res.json({leer: 'error de stripe', message: error.raw.message });
  }
});

export default router; 