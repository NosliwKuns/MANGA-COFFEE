import mongoose from'mongoose';
const {Schema} = mongoose

const UserSchema = new Schema({
    user:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    telephone:{
        type: Number
    },
    address:{
        type: String,
    },
    favorites:{
        type:[String]
    }
})

const User = mongoose.model('Manga', UserSchema)

export default User