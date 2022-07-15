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
        <fieldset style="margin: 1%; margin-right:20%; margin-left:20%; background-image:url(https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-national-tide-wind-dunhuang-cultural-background-picture-image_784394.jpg); background-size: cover; border:solid; border-radius:10px ">
             <h2 style="margin-left:30%; font-size:italic; font-weight:bold">Hola ${name}</h2>
            <p style="margin-left:6%; font-weight:bold;">Para confirmar tu cuenta, ingresa al siguiente enlace:</p>
            <a style="margin-left: 35%; color:rgb(0, 26, 255); font-weight:bold;" href="http://localhost:3000/verificateUser/${token}"target="_blank" > Confirmar Cuenta</a>
        </fieldset>
           
    </div>
    </div>
    `;
};
exports.default = verificCorreo;
