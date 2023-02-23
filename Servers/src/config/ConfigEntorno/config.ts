import dotenv from "dotenv";
dotenv.config();

export default {
  //------passport-----//
  jwtsecret: process.env.JWT_SECRET || "mysecretmangacoffetoken",
  //------mongodb------//
  Db: process.env.URI || "mongodb+srv://Default2310:dUWDSYBmgpwjgu5x@cluster0.iqdewrr.mongodb.net/Manga-Coffe",
  //------.gooogle-----//
  MAIL: "mangacoffe2310@gmail.com",
  PASS: "manga23coffe10",
  CLIENTD_ID: "185422760918-fauj1280lc128l69nc4s5lnr47031ms7.apps.googleusercontent.com",
  CLIENTD_SECRET: "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",
  CLIENTD_REFRESHTOKEN:"1//04L1CLCD8L-VgCgYIARAAGAQSNwF-L9IrdETXIa9zD6W-UrRmXA2n0HKetgV-Wgd9uP-B3c2e84uIxwVo_Fd2wxhsqMJvo_5ATy8",
  URI_REDIRECT: "https://developers.google.com/oauthplayground",
  //------cloudinary----//
  CLOUDINARY_NAME: "manga-coffe",
  CLOUDINARY_API_KEY: "289919794386462",
  CLOUDINARY_API_SECRET: "Qq6MdTg9c-yBlxlixfHI5g-LwqM"

  // https://console.cloud.google.com/apis/credentials/oauthclient/185422760918-fauj1280lc128l69nc4s5lnr47031ms7.apps.googleusercontent.com?project=correoverificacion
  
  //https://mail.google.com/
  //https://developers.google.com/oauthplayground/?code=4/0AdQt8qi5M9scaUnIXyPdU0IMLxtCHMFDMUi0K4E0TWtcSk58gl8z4G-jVIrHljsq62EiIA&scope=https://mail.google.com/

};
