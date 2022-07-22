import  { Router } from'express';
import fs from 'fs-extra';
import  Manga from '../../../models/Mangas/Manga.js';
import { Uploadimage } from '../../../config/Cloudinary/index.js';
import { FilesImage } from '../../../middlewares/FileUpload/index.js';
const router = Router();

router.post('/', FilesImage(), async(req, res, next) => { 
    const {title, genres, cover_image, description, rating, comments, chapter} = req.body;
    try {  
        if (req.files?.books){
            const { books}: any = req.files;
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
            const manga = new Manga({title, genres: JSON.parse(genres), cover_image, description, mangas, rating, comments});
            let newmanga = await manga.save()
            res.status(200).json(newmanga)
        } 
    } catch (error) {
        next(error)
    }
})

export default router;