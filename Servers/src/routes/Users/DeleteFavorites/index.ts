import { Router } from 'express';
// import passport from "passport";
import User from '../../../models/Users/User.js';
const router = Router();


router.delete('/', async (req, res) => {
    const {id, mangaId} = req.query;
    try {
        const user: any = await User.findById(id);
        const deleted = await user.favorites.filter((m: string) => m !== mangaId)
        await User.findByIdAndUpdate({_id: id}, {favorites: deleted});
        const userUpdated = await User.findById(id);
        res.status(200).json(userUpdated);
    }
    catch(error){
        res.status(500).json({message: 'Error'});
    }
}
);
export default router;