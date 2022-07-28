"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationBuy = (product, total) => {
    let productos = "";
    product.forEach((element) => {
        productos = `${productos}<p> Name: ${element.name}; Price: ${element.price}; Cuantity: ${element.quantity}; Total: ${element.totProduct} </p>`;
    });
    return `
    <head>
    <link rel="stylesheet" href="./style.css">
  </head>      
  <div style="
  margin-left:10%;
  ">
  <div style="
  border:4px solid;
  margin-left:20%;
  margin-right: 40%;
  background-image: url(https://media.istockphoto.com/photos/white-grunge-paper-texture-background-picture-id1219828200?b=1&k=20&m=1219828200&s=170667a&w=0&h=oYSdIewi9_CU7SJsUJ40AAiHX4qt3N4QNahMonj4wXc=);
  " id="email___content">
      <h1 style="
      margin-left: 3%;
      font-family: cursive;
      ">Thank You For Your Purchase!</h1>
      <h2 style="
      margin-left: 2%;
      font-family: cursive;
      ">Productos </h2>
      <div style="margin-left:2%; font-family: cursive;">
          ${productos}
      </div>
      <h4 style="
      margin-left: 2%;
      font-family: cursive;
      "> Total Amount: ${total}</h4>
     <img  style="
  margin:2%;
  margin-left: 12%;

  " 
  src="https://i.pinimg.com/originals/4f/92/fe/4f92fe4ee07e79bc3495e41bb5ae1bd3.gif"/>   
  </div> 
  
  </div>
    `;
};
exports.default = NotificationBuy;
