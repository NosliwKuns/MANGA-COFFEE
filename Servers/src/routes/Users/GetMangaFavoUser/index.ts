import { Router } from 'express';
// import passport from "passport";
import User from '../../../models/Users/User.js';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();

// passport.authenticate("jwt", { session: false })
router.get('/favorites/:id', async(req, res, next) => {
    console.log('GetByIdUser')
    const {id} = req.params;
    let manga={}
    try { 
        console.log(id)
        const user = await User.findById(id, ['favorites'])
        
        manga = await Manga.paginate({_id:user?.favorites},
            {
            limit:  12,
            select: ["title", "genres", "rating" ,"cover_image"],
            sort:{title:1}
        })
        res.status(200).json(manga)
    } catch (error) {
        next(error)
    }
})

export default router;