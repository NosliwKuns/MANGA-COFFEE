const { connectToDB, getDB } = require('./db');
const server = require('./src/app.js');

let db
connectToDB((err) => {
if (!err){
    server.listen(3000, ()=> {
        console.log('app listening on port 3000')
    })
    db = getDB()
}
})