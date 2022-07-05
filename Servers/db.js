const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect('mongodb+srv://grupopfhenry:animecoffee@cluster0.9p5jotq.mongodb.net/?retryWrites=true&w=majority')
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDB: () => dbConnection
}