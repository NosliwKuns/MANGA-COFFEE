"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationBuy = (product, total) => {
    let productos = "";
    product.forEach((element) => {
        productos = `${productos}<p> Name: ${element.name}; Price: ${element.price}; Cuantity: ${element.quantity}; Total: ${element.totProduct} </p>`;
    });
    console.log(productos);
    return `
        <head>
          <link rel="stylesheet" href="./style.css">
        </head>      
        <div id="email___content">
            <h1>Thank You For Your Purchase!</h1>
            <h2>Productos </h2>
            ${productos}
            <h4> Total Amount: ${total}</h4>
        </div>
    `;
};
exports.default = NotificationBuy;
