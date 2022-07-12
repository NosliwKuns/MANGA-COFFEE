import mongoose from'mongoose';
const {Schema} = mongoose

const ProductSchema = new Schema({
    id_User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true
    },
   category:{
        type:[String],
        required: true
    },
    product_image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    rating:{
        type:String,
        enum: [ 1 , 2 , 3 , 4 , 5 ]
    },
    comments: {
        type:[{ name: String, body: String }]
    },
    stock:{
        type: Number,
        required: true
    }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product;
// esto lo borro despues