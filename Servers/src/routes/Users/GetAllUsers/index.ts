import {Router} from 'express';
import Users from '../../../models/Users/User';
const router = Router();

router.get('/', async(req, res) => {
    try{
        let users = await Users.find({})
        res.status(200).json(users)
    } catch(error){
        res.status(500).json(error)
    }
}
)
export default router;
