import  mongoose from 'mongoose';
import dotenv from  'dotenv';
dotenv.config();

let ruta: any  = process.env.URI
mongoose.connect( ruta )
    .then(() => console.log('database conect'))
    .catch((error) => console.log('Error database conect ', error))