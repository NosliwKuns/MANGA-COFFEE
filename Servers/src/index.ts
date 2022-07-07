import server from './app.js';

// const PORT = process.env.PORT || 3000
// server.listen(PORT, ()=> {
//     console.log('app listening on port ' + PORT)
// })

var express = require('express');
var app     = express();
const cors = require('cors');
server.use(cors());

app.set('port', (process.env.PORT || 5000));

server.listen(app.get('port'), () => {
    console.log('app listening on port ');
});
