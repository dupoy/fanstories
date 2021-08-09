import { UserEntity } from './../entities/user.entity';
import { Request } from 'express';

export interface IRequest extends Request {
  user?: UserEntity;
}
