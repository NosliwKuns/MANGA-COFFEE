import mongoose from'mongoose';
import paginate from 'mongoose-paginate-v2';
const {Schema} = mongoose

export interface IMangas extends mongoose.Document{
    title:string,
    genres:[String],
    cover_image:string,
    rating: Number,
    mangas: [{chapter: Number, link: [String]}]
};

const MangaSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    genres:{
        type:[String],
        required: true
    },
    cover_image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    mangas:{
        type:[{chapter: Number, link: [String]}],
        required: true
    },
    rating:{
        type: Number,
        default: 5
    },
    ratinger:{
        type:[Number],
        enum: [ 1 , 2 , 3 , 4 , 5 ]
    },
    comments: {
        type:[{ name: String, body: String, time: String, userId: String }]
    }
})

MangaSchema.plugin(paginate);

const Manga = mongoose.model<
IMangas,
mongoose.PaginateModel<IMangas>
>('Manga', MangaSchema)
export default Manga

