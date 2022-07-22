import mongoose from'mongoose';
import paginate from 'mongoose-paginate-v2';
const {Schema} = mongoose
export interface IProducts extends mongoose.Document{
    name: string,
    category:string,
    price:string,
    rating:string
};



const ProductSchema = new Schema({
    id_User: {
        type: String,
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
        type:Number,
    },
    ratinger:{
        type:[Number],
        enum: [ 1 , 2 , 3 , 4 , 5 ]
    },
    comments: {
        type:[{ name: String, body: String }],
        created_at:{ type: Date, required: true, default: Date.now }
    },
    stock:{
        type: Number,
        required: true
    }
})

// const Product = mongoose.model('Product', ProductSchema)

ProductSchema.plugin(paginate);
const Product = mongoose.model<
IProducts,
mongoose.PaginateModel<IProducts>
>('Product', ProductSchema)

export default Product;
// esto lo borro despues