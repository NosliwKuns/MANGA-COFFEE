import  { Router } from'express';
import fs from 'fs-extra';
import passport from "passport";
import  Manga from '../../../models/Mangas/Manga.js';
import User from "../../../models/Users/User.js";
import { Uploadimage } from '../../../config/Cloudinary/index.js';
import { FilesImage } from '../../../middlewares/FileUpload/index.js';
import ReadTokenData from '../../../controles/Token/ReadTokenData/index.js';
const router = Router();

router.put('/admin/addchapter',  passport.authenticate("jwt", { session: false }), FilesImage(), async(req, res, next) => { 
    const { idManga } = req.body;
    const {authorization} = req.headers;
    let { books}: any = req.files;
    try {
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        if (user && user.admin){ 
            if (req.files?.books){                
                const mangainfo = await Manga.findById(idManga)
                if (mangainfo){
                    let link: any = [];
                    let chapter = mangainfo.mangas[mangainfo.mangas.length-1].chapter|| 0; 
                    let folderpath = `Mangas/${mangainfo.title}/chapter${Number(chapter)+1}`;
                    for (let i = 0; i < books.length; i++) {                
                        let linkClaudinary = await Uploadimage(books[i].tempFilePath, folderpath);
                        await fs.unlink(books[i].tempFilePath)
                        link.push(linkClaudinary.secure_url)
                    }
                    let newmanga = {
                        chapter: Number(chapter)+1,
                        link: link
                    }
                    await Manga.findByIdAndUpdate((idManga), {$push:{mangas:newmanga}})
                    res.status(200).json('The chapter was successfuly added !')  
                }                
            }else {
                res.status(400).json("Some info is missed")
            }
        } else{
            res.status(400).json("you have not authorization")
        }
    } catch (error) {
        next(error)
    }
})

export default router;