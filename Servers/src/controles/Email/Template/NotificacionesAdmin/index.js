"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminNotification = (msg) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
      <p>${msg}</p>
      </div>
    `;
};
exports.default = AdminNotification;
