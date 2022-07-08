import  mongoose from 'mongoose';
import config from './config/config'

mongoose.connect( config.Db )
    .then(() => console.log('database conect'))
    .catch((error) => console.log('Error database conect ', error))