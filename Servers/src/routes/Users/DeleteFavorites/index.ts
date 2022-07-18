import { Router } from 'express';
// import passport from "passport";
import User from '../../../models/Users/User.js';
import Manga from '../../../models/Mangas/Manga';
const router = Router();


router.delete('/', async (req, res) => {
    const {id, mangaId} = req.query;
    try {
        const user: any = await User.findById(id);
        const deleted = await user.favorites.filter((m: string) => m !== mangaId)
        const myUser = await User.findByIdAndUpdate({_id: id}, {favorites: deleted});
        const userdos = await User.findById(id, ['favorites'])
        const manga = await Manga.paginate({_id:userdos?.favorites},
            {
            limit:  12,
            select: ["title", "genres", "rating" ,"cover_image"],
            sort:{title:1}
        })
        res.status(200).json(manga)
    }
    catch(error){
        res.status(500).json({message: 'Error'});
    }
}
);
export default router;