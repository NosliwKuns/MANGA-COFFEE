"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResetPass = (name, id) => {
    return `
    <div style="margin-left:21%;">
    <head>
        <link rel="stylesheet" href="./style.css">
    </head>
    
    <div id="email___content" style="margin-right: 37%;" >
    <h1>Cordial saludo ${name}</h1>
    <h3>Solicitud restablecimiento de contraseña</h3>
    <p>Se ha realizado una solicitud para restablecer la contraseña de tu cuenta;</p>
    <p>Por favor sigue el siguiente vinculo para realizar la modificacion</p>
    <a style="margin-left: 35%; color:rgb(0, 26, 255); font-weight:bold;" href="http://localhost:3000/rename/password/${id}" target="_blank" > Restablecer constraseña</a>
    <p>si no fuiste tu por favor obvie este mensaje, tu contraseña no se modificara</p>
           
    </div>
    </div>
    `;
};
exports.default = ResetPass;
