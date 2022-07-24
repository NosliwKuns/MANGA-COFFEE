import { Router } from 'express';
import Manga from '../../../models/Mangas/Manga.js';
const router = Router();

router.get('/', async(req : any, res) => {   
    try{
        const page : number = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;
        const search = req.query.search || '';
        let sort = req.query.sort || 'title';
        let genres = req.query.genres || 'All';

        const filters= await Manga.find();
        const data : Array<string> = filters.flatMap(e => e.genres); 
        const dataArr = new Set(data);
        const genresOptions : Array<string> = [...dataArr];

        genres === 'All'
            ? (genres = [...genresOptions])
            : (genres = req.query.genres.split(','));
        req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort])

        let sortBy : any = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = 'asc';
        }

        const mangas = await Manga.find({ title: { $regex: '.*' + search + '.*', $options: 'i' }})
            .where('genres')
            .in([...genres])
            .sort(sortBy)
            .skip(page*limit)
            .limit(limit);


        const total = await Manga.countDocuments({
            genres: {$in: [...genres]},
            title: {$regex: search, $options: 'i'},
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            genres: genresOptions,
            mangas,
        };

        res.status(200).json(response);

    } catch(error){
        res.status(500).json(error)
    }
})

export default router;

//////