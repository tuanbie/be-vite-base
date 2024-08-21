import { TypeJWT } from '@common/constants/jwt.enum';
import { User } from '../common/models/entity/user.entity';
import { Types } from 'mongoose';

export interface ICurrentUser extends User {
  _id: Types.ObjectId;
  typeToken?: TypeJWT;
}
