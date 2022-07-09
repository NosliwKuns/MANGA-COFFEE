import { Router } from 'express';
import Manga from '../../../models/Manga.js';
const router = Router();

router.get('/genres', async (req, res, next) => {
    const{genres}=req.body;
    let generos:any=[]
    let unicos:any=[]
    try{
        for(let i=0; i<genres.length; i++) {
            const filters= await Manga.find({genres:genres[i]},["title","cover_image","genres"]);
            generos.push(filters)
        }

       
        for(let j=0; j<generos.length; j++){
            let contador=0
            for(let c:any=1; c<unicos.length; c++){
                contador=c
                if(unicos[c]._id===generos[j]._id){
                    return
                }
            }
            if(contador===unicos.length){
                unicos.push(generos[j])
            }
        }
        res.status(200).json(unicos)

    }catch(error){
        next(error);
    }
})
    

export default router;