"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verificCorreo = (name, token) => {
    return `
    <div style="margin-left:21%;">
    <head>
        <link rel="stylesheet" href="./style.css">
    </head>
    
    <div id="email___content" style="margin-right: 37%;" >
    <img style="margin-left:15%; border:solid; border-radius:20px;"src="https://i.pinimg.com/originals/ae/fe/16/aefe16342359793e648e2ce92619d2cf.gif" alt=""  >
        <fieldset style="margin: 1%; margin-right:20%; margin-left:25%; background-image:url(https://i.pinimg.com/originals/79/50/0c/79500cbc38fa4bd5f5b7c5d640a5cb35.gif); background-size: cover; border:solid; border-radius:10px ">
             <h2 style="margin-left:30%; font-size:italic; font-weight:bold">Hi ${name}</h2>
            <p style="margin-left:6%; font-weight:bold;">Verify your email, Click on the next link:</p>
            <a style="margin-left: 28%; color:rgb(0, 26, 255); font-weight:bold;" href="https://manga-coffee.vercel.app/verificateUser/${token}"target="_blank" > Confirm your email</a>
        </fieldset>
           
    </div>
    </div>
    `;
};
exports.default = verificCorreo;
