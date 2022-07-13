import {Router} from 'express';
import Manga from '../../../models/Mangas/Manga';
const router = Router();

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {title, genres, cover_image, description, mangas, rating, comments} = req.body;
    try {
        await Manga.findByIdAndUpdate(id, {
            title,
            genres,
            cover_image,
            description,
            mangas,
            rating,
            comments
        });
        res.send('Item Updated!');

    }
    catch(error){
        res.status(500).json({message: 'Error'});
    }
}
);
export default router;
