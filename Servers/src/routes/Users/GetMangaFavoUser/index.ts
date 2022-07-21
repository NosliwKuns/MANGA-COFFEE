import { Router } from 'express';
import passport from "passport";
import User from '../../../models/Users/User.js';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();

router.get('/favorites/:id', passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const {id} = req.params;
    let manga={}
    try {         
        const user = await User.findById(id, ['favorites']);        
        manga = await Manga.paginate({_id:user?.favorites},
            {
            limit:  12,
            select: ["title", "genres", "rating" ,"cover_image"],
            sort:{title:1}
        });
        res.status(200).json(manga);
    } catch (error) {
        next(error)
    }
})

export default router;