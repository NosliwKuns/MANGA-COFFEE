import { Router } from 'express';
// import passport from "passport";
import User from '../../../models/Users/User.js';
const router = Router();


router.delete('/', async (req, res) => {
    const {id , mangaId} = req.query;
    //const {_id} = req.body;
    try {
        await User.findByIdAndDelete(id, {
            favorites:[mangaId]
        });
        res.send('Item Deleted!');

    }
    catch(error){
        res.status(500).json({message: 'Error'});
    }
}
);
export default router;