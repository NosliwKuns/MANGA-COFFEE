import mongoose from'mongoose';
const {Schema} = mongoose

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
        type:String,
        enum: [ 1 , 2 , 3 , 4 , 5 ]
    },
    comments: {
        type:[{ name: String, body: String }]
    }
})

const Manga = mongoose.model('Manga', MangaSchema)

export default Manga