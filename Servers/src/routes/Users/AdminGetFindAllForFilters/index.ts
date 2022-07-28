import { Router } from 'express';
import passport from 'passport';
import ReadTokenData from '../../../controles/Token/ReadTokenData';
import User from '../../../models/Users/User';
import Manga from '../../../models/Mangas/Manga';
import Product from '../../../models/Products/index';
const router = Router();


router.get('/admin', passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const {authorization} = req.headers; 
    const { type } = req.query;
    try {
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        if (user && user.admin){
            if (type === 'mangas'){
                const filters= await Manga.find();
                const data = [...new Set( filters.flatMap(e => e.genres))]; 
                res.status(200).json(data)
            } else if ( type === 'products'){
                const filters= await Product.find();
                const filtermanga = await Manga.find();
                const categorydata: any = [...new Set( filters.flatMap(e => e.category))]; 
                const titledata = [...new Set( filtermanga.flatMap(e => e.title))];
                const data = { category: categorydata, titles: titledata };
                res.status(200).json(data)
            } else {
                res.status(400).json('No valid option')
            }
        }
    } catch (error) {
        next(error)
    }


})

export default router;