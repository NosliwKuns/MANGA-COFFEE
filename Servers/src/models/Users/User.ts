import mongoose from'mongoose';
import bCrypt from 'bcrypt';
const {Schema, model} = mongoose;

export interface IUser extends mongoose.Document{    
    email: string,
    password: string,
    comparePassword: (pasword: string) => Promise<boolean>,
    favorites: [Object],
    verificated: boolean,
    users: string,
};

const UserSchema = new Schema({
    users:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    verificated:{
        type: Boolean,
        required: true,
        default: false
    },
    name:{
        type:String,
        default: ""
    },
    lastname:{
        type: String,
        default: ""
    },
    user_image:{
        type: String,
        default: ""
    },
    user_banner:{
        type: String,
        default: ""
    },
    user_description:{
        type: String,
        default: ""
    },
    telephone:{
        type: String,
        default: ""
    },
    address:{
        type: {
            postalCode: String,
            country:  String,
            direction:  String,
            reference:  String
        },
        default: {
            postalCode : "",
            country : "",
            direction : "" ,
            reference : ""
        }
    },
    historyBuy: {
        type: [{
            date: String,
            idCompra: String,
            produtcs: [{
                idProduct: String,
                name: String,
                price: Number,
                quantity: Number 
            }],
            total : Number,
            adrress:{
                postalCode : String,
                country : String,
                direction : String,
                reference : String
            },
            name: String,
            lastName: String,
            telephone: String,
            method: String,
            email: String
        }],
        default: []
    },
    favorites:{
        type:[Object],
        default: []
    },
    wishlist:{
        type:[Object],
        default: []
    }
});

UserSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')){
        return next();
    };
    const salt = await bCrypt.genSalt(10);
    const hash = await bCrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
   return await bCrypt.compare(password, this.password)
};

export default model<IUser>('User', UserSchema);