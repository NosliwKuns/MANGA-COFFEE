import server from './app.js';

const PORT = process.env.PORT || 3000
server.listen(PORT, ()=> {
    console.log('app listening on port ' + PORT)
})
