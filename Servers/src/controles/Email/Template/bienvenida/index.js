"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Welcome = (name) => {
    return `
    <head>
    <link rel="stylesheet" href="./style.css">
</head>

<div style="
margin:2%;
background-image: url(https://i.pinimg.com/originals/79/50/0c/79500cbc38fa4bd5f5b7c5d640a5cb35.gif);
margin-left: 25%;
margin-right: 25%;
border: solid;
">
<div style="
    margin:100px;
    " id="email___content">
<img style="
    margin:1%;
    margin-left:-4%;
    border:5px solid 
    "src="https://pa1.narvii.com/6449/50ead78d604a4295f029a0e9d0ed19abad660cdd_hq.gif" alt="">
<h2 style="
    margin-left:35%;
    font-family: cursive;
">Hi ${name} ✌</h2>
</div>
    `;
};
exports.default = Welcome;
