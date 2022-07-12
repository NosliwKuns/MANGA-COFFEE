import config from '../../../config/ConfigEntorno/config';
import { IUser } from '../../../models/Users/User';
import jwt from 'jsonwebtoken';

function createToken(user: IUser) {
    return jwt.sign({id: user._id, email: user.email}, config.jwtsecret,{
       expiresIn: 86400
   })
}

export default createToken;