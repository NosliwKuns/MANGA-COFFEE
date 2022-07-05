const express = require('express');
const router = express.Router();
const {getDB } = require('./db');
let db = getDB();

router.get('/', async(req, res, next) => {
    const {name} = req.query;
    try {
        let manga = await db.collection('manga').find({ "title": name })
        res.status(200).json(manga)
    } catch (error) {
        next(error)
    }
})

module.exports = router;