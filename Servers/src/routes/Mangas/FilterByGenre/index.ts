import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();


router.get('/genero', async (req, res, next)=>{
    const {genres}=req.query;
    let generos:any=[]

    try{
        const filters= await Manga.find({genres:genres},["title","cover_image","genres"]);
        generos.push(filters);

        const unicos=generos.filter((valor:any,indice:any)=>{
            return generos.indexOf(valor)==indice
        })

        
        res.status(200).json(unicos)
    }catch (error) {
        next(error);
    }

    
})

export default router;