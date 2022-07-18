import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';

const router = Router();


router.put('/rating/:id', async(req, res, next)=>{
    const {rating} = req.body
    const {id} = req.params;
    console.log(rating)
    
    try {          
        await Manga.findByIdAndUpdate((id),{$push:{rating:rating}})
        
        let response: any = await Manga.findOne({_id:id})
        let response2:any = response.rating.reduce((a:number,b:number) => (a+b)) / response.rating.length
        console.log(response2)
                    res.status(200).json(response2)
    } catch (error) {
        next(error)
    }
})

export default  router;