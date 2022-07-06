const mongoose = require('mongoose')


mongoose.connect(process.env.URI)
    .then(() => console.log('database conect'))
    .catch((error) => console.log('Error database conect ', error))