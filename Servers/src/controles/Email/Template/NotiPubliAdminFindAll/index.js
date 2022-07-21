"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminNotiPubli = (msg, image) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
      <img src=${image} >
      <p>${msg}</p>
      </div>
    `;
};
exports.default = AdminNotiPubli;
