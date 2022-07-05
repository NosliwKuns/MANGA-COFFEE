const express = require('express')
const { connectToDB, getDB } = require('./db') 

const app = express()
let db
connectToDB((err) => {
if (!err){
    app.listen(3000, ()=> {
        console.log('app listening on port 3000')
    })
    db = getDB()
}
})


app.get('/manga', (req, res)=>{
    let manga = []
    db.collection('manga')
    .find()
    .sort({author: 1})
    .forEach(m => manga.push(m))
    .then(()=> {
        res.status(200).json(manga)
    })
    .catch(() => {
        res.status(500).json({error: 'Cloud not fetch the documents'})
    })


    res.json({mssg: 'welcome to the api'})
})