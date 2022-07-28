import  { Router } from'express';
import fs from 'fs-extra';
import passport from "passport";
import  Manga from '../../../models/Mangas/Manga.js';
import User from "../../../models/Users/User.js";
import { Uploadimage } from '../../../config/Cloudinary/index.js';
import { FilesImage } from '../../../middlewares/FileUpload/index.js';
import ReadTokenData from '../../../controles/Token/ReadTokenData/index.js';
const router = Router();

router.post('/',  passport.authenticate("jwt", { session: false }), FilesImage(), async(req, res, next) => { 
    const {title, genres, description, comments, chapter} = req.body;
    const {authorization} = req.headers;
    try { 
        const data= ReadTokenData(authorization);
        const user = await User.findById(data.id);
        if (user && user.admin){ 
            if (req.files?.books){
                let { books, cover_image }: any = req.files;
                let link: any = [];
                let folderpath = `Mangas/${title}/chapter${chapter}`;
                for (let i = 0; i < books.length; i++) {                
                    let linkClaudinary = await Uploadimage(books[i].tempFilePath, folderpath);
                    await fs.unlink(books[i].tempFilePath)
                    link.push(linkClaudinary.secure_url)
                }
                let mangas = {
                    chapter: chapter,
                    link: link
                }
                folderpath = `Mangas/${title}/cover_image`;
                let CoverImgClaudinary = await Uploadimage(cover_image.tempFilePath, folderpath);
                await fs.unlink(cover_image.tempFilePath);
                cover_image = CoverImgClaudinary.secure_url;
                const manga = new Manga({title, genres: genres.split(','), cover_image, description, mangas, comments});
                await manga.save()
                res.status(200).json('Manga Added Successfull!')
            }else {
                res.status(400).json("Uncomplete Information")
            }
        } else{
            res.status(400).json("You are not authorized")
        }
    } catch (error) {
        next(error)
    }
})

export default router;