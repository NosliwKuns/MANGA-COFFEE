import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';

const router = Router();


router.put('/rating/:id', async(req, res, next)=>{
    const {ratinger} = req.body
    const {id} = req.params;
    console.log(ratinger)
    
    try {          
        await Manga.findByIdAndUpdate((id),{$push:{ratinger:ratinger}})
        
        let response: any = await Manga.findOne({_id:id})
        let response2:any = response.ratinger.reduce((a:number,b:number) => (a+b)) / response.ratinger.length

        await Manga.findByIdAndUpdate((id),{$set:{rating:response2}})

                    res.status(200).json(response2)
    } catch (error) {
        next(error)
    }
})


export default  router;