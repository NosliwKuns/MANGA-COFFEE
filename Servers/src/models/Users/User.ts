import mongoose from'mongoose';
import bCrypt from 'bcrypt';
const {Schema, model} = mongoose;

export interface IUser extends mongoose.Document{    
    email: string,
    password: string,
    comparePassword: (pasword: string) => Promise<boolean>,
    favorites: [Object],
};

const UserSchema = new Schema({
    users:{
        type: String,
        required: true,
    },
    name:{
        type:String,
    },
    lastname:{
        type: String,
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
        type:[Object]
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