import dotenv from  'dotenv';
dotenv.config();

export default {
    jwtsecret: process.env.JWT_SECRET || "mysecretmangacoffetoken",
    Db: process.env.URI || "mongodb+srv://Default2310:dUWDSYBmgpwjgu5x@cluster0.iqdewrr.mongodb.net/Manga-Coffe",
    MAIL: 'mangacoffe2310@gmail.com',
    PASS: 'manga23coffe10',
    CLIENTD_ID: '185422760918-fauj1280lc128l69nc4s5lnr47031ms7.apps.googleusercontent.com',
    CLIENTD_SECRET: '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',
    CLIENTD_REFRESHTOKEN: '1//044LzUHx5_wG2CgYIARAAGAQSNwF-L9IrRKhTFskNZ9IVOQfMqeQV_7J28B6Bv5eRqx0-w2Mf61OxhUELOvjm-w2bonEKplNXrns',
    URI_REDIRECT: 'https://developers.google.com/oauthplayground'
}