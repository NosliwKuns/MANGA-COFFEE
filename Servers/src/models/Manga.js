const mongoose = require('mongoose');
const {Schema} = mongoose

const MangaSchema = new Schema({
    title:{

    },
    genres:{

    },
    image_backgraund:{

    },
    description:{

    },
    chapters:{

    }
})

const Manga = mongoose.model('Manga', MangaSchema)
module.exports = Manga