"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResetPass = (name, id) => {
    return `
    <div style="
margin:40px;
margin-left:28%;

">
    <head>
        <link rel="stylesheet" href="./style.css">
    </head>
    
    <div id="email___content" style="
    margin-right: 37%;
    background-image: url(https://c.tenor.com/yfHWbwZUmgEAAAAC/pastel.gif);
    border: 4px solid;
    " >
    <h1 style="
    font-family: cursive;
    margin-left:1%
    ">Hello ${name}</h1>
    <h3 style="
    font-family: cursive; 
    margin-left:1%">Reset Account Password</h3>
    <p style="
    font-family: cursive; 
    margin-left:1%">There was recently a request to change the passwor for your account;</p>
    <p style="
    font-family: cursive; 
    margin-left:1%">If you requested this change, set a new password here: </p>
    <a style="
    margin-left: 35%; 
    font-family: cursive; 
    color:rgb(0, 26, 255); 
    font-weight:bold;" href="https://manga-coffee.vercel.app/rename/password/${id}" target="_blank" > Set a New Password</a>
    <p style="
    font-family: cursive; 
    margin-left:1%">If did not make this request, you can ignore this email and your password will remain the same.</p>
    <img style="margin-left:17%" src="https://i.pinimg.com/originals/e4/97/e9/e497e9cfa0c8d4c0bfd78c2c508c6f09.gif"/>        
    </div>
    </div>
    `;
};
exports.default = ResetPass;
