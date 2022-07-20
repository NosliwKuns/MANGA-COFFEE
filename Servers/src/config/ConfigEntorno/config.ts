import dotenv from "dotenv";
dotenv.config();

export default {
  jwtsecret: process.env.JWT_SECRET || "mysecretmangacoffetoken",
  Db:
    process.env.URI ||
    "mongodb+srv://Default2310:dUWDSYBmgpwjgu5x@cluster0.iqdewrr.mongodb.net/Manga-Coffe",
  MAIL: "mangacoffe2310@gmail.com",
  PASS: "manga23coffe10",
  CLIENTD_ID:
    "185422760918-fauj1280lc128l69nc4s5lnr47031ms7.apps.googleusercontent.com",
  CLIENTD_SECRET: "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",
  CLIENTD_REFRESHTOKEN:
    "1//04PkLsmfu124nCgYIARAAGAQSNwF-L9IrdB68eDOQahrkhiNzOp7NChx-YyvfS30sSB1_YOhzj6wvH7IoH5Hz9GZHNi4F3eaQQKQ",
  URI_REDIRECT: "https://developers.google.com/oauthplayground",

  // 1//04PkLsmfu124nCgYIARAAGAQSNwF-L9IrdB68eDOQahrkhiNzOp7NChx-YyvfS30sSB1_YOhzj6wvH7IoH5Hz9GZHNi4F3eaQQKQ

  //https://mail.google.com/

  //     https://developers.google.com/oauthplayground/?code=4/0AdQt8qi5M9scaUnIXyPdU0IMLxtCHMFDMUi0K4E0TWtcSk58gl8z4G-jVIrHljsq62EiIA&scope=https://mail.google.com/

  // https://console.cloud.google.com/apis/credentials/oauthclient/185422760918-fauj1280lc128l69nc4s5lnr47031ms7.apps.googleusercontent.com?project=correoverificacion
};
