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
    image_backgraund:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    chapters:{
        type:[String],
        required: true
    }
})

const Manga = mongoose.model('Manga', MangaSchema)

export default Manga