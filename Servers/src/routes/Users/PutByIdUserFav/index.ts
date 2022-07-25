import { Router } from 'express';
import passport from "passport";
import User from '../../../models/Users/User.js';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();
 
router.put('/fav/:id', passport.authenticate("jwt", { session: false }), async(req, res, next) => {
    const {id} = req.params;
    const {favorites} = req.body;
    let manga={}
    try { 
        await User.findByIdAndUpdate((id), {$push:{favorites}});
        const user = await User.findById(id, ['favorites']);        
        manga = await Manga.paginate({_id:user?.favorites},
            {
            limit:  12,
            select: ["title", "genres", "rating" ,"cover_image"],
            sort:{title:1}
        });
        console.log(manga);
        res.status(200).json(manga);
    } catch (error) {
        next(error);
    }
})

export default router;