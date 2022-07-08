import dotenv from  'dotenv';
dotenv.config();

export default {
    jwtsecret: process.env.JWT_SECRET || "mysecretmangacoffetoken",
    Db: process.env.URI || "mongodb+srv://Default2310:dUWDSYBmgpwjgu5x@cluster0.iqdewrr.mongodb.net/Manga-Coffe"
}