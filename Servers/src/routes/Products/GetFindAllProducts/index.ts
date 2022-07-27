import {Router} from 'express';
import Products from '../../../models/Products/index';
const router = Router();

router.get('/', async(req : any, res) => {
    try{
        const page : number = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;
        const search = req.query.search || '';
        let sort = req.query.sort || 'name';
        let category = req.query.category || 'All';

        const filters= await Products.find();
        const data : Array<string> = filters.flatMap(e => e.category); 
        const dataArr = new Set(data);
        const categoriesOptions : Array<string> = [...dataArr];

        category === 'All'
            ? (category = [...categoriesOptions])
            : (category = req.query.category.split(','));
        req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort])

        let sortBy : any = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = 'asc';
        }

        const products = await Products.find({ name: { $regex: '.*' + search + '.*', $options: 'i' }})
            .where('category')
            .in([...category])
            .sort(sortBy)
            .skip(page*limit)
            .limit(limit);


        const total = await Products.countDocuments({
            category: {$in: [...category]},
            name: {$regex: search, $options: 'i'},
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            category: categoriesOptions,
            products,
        };

        res.status(200).json(response);

    } catch(error){
        res.status(500).json(error)
    }
})
export default router;
// Product//////