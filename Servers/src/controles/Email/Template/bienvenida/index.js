"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Welcome = (name) => {
    return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
      <img src="https://p4.wallpaperbetter.com/wallpaper/1011/181/309/anime-art-artistic-children-wallpaper-preview.jpg" alt="">
          <h2>Hi ${name}</h2>

      </div>
    `;
};
exports.default = Welcome;
