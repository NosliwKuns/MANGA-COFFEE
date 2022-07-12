import config from '../../config/config';
import { IUser } from '../../models/Users/User';
import jwt from 'jsonwebtoken';

function createToken(user: IUser) {
    return jwt.sign({id: user._id, email: user.email}, config.jwtsecret,{
       expiresIn:'1000000000000000000000000000000000000000000000000 years'
   })
}

export default createToken;