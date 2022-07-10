import mongoose from'mongoose';
const {Schema} = mongoose

const ProductsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type:[String],
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    stock:{
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

const Products = mongoose.model('Products', ProductsSchema)

export default Products