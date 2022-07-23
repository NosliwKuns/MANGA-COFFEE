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
    const { idManga, chapter} = req.body;
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
                    let folderpath = `Mangas/${mangainfo.title}/chapter${chapter}`;
                    for (let i = 0; i < books.length; i++) {                
                        let linkClaudinary = await Uploadimage(books[i].tempFilePath, folderpath);
                        await fs.unlink(books[i].tempFilePath)
                        link.push(linkClaudinary.secure_url)
                    }
                    let mangas = {
                        chapter: chapter,
                        link: link
                    }
                    await Manga.findByIdAndUpdate((idManga), {$push:{mangas:mangas}})
                    res.status(200).json('El capitulo de su manga se Agrego con Exito!')
                }                
            }else {
                res.status(400).json("Informacion incompleta")
            }
        } else{
            res.status(400).json("No cuentas con autorizacion")
        }
    } catch (error) {
        next(error)
    }
})

export default router;