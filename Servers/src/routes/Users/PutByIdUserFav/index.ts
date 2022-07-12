import { Router } from 'express';
// import passport from "passport";
import User from '../../../models/Users/User.js';
const router = Router();

// passport.authenticate("jwt", { session: false }),
router.put('/fav/:id', async(req, res, next) => {
    console.log('PutByIdUser')
    const {id} = req.params;
    const {favorites} = req.body;
    try { 
        const oldUser = await User.findById(id); 
        let favOld = oldUser?.favorites;
        let favNew: Object;
        if (favOld){
            favNew = favOld.concat(favorites);
        } else{
            favNew = favorites
        }
        await User.findByIdAndUpdate({_id: id}, {favorites: favNew});
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
})

export default router;