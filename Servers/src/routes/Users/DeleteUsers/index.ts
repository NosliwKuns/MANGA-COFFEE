import {Router} from 'express';
import User from '../../../models/Users/User.js';
const router = Router();

router.delete('/:id', async(req, res, next)=>{
    
    try{
        const {id} = req.params;
        await User.findByIdAndDelete(id)
        res.status(200).send("usuario Eliminado");
    }catch(err){
        next(err)
    }
    
})

export default router;