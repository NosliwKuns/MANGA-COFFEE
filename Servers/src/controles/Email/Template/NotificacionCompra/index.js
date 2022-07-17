"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationBuy = (product, total) => {
    let productos = "";
    product.forEach((element) => {
        productos = `${productos}<p> Nombre: ${element.name}; Precio: ${element.price}; Cantidad: ${element.quantity}; Total: ${element.totProduct} </p>`;
    });
    console.log(productos);
    return `
        <head>
          <link rel="stylesheet" href="./style.css">
        </head>      
        <div id="email___content">
            <h1>Compra realzada con exito </h1>
            <h2>Productos </h2>
            ${productos}
            <h4> Total de la compra: ${total}</h4>
        </div>
    `;
};
exports.default = NotificationBuy;
